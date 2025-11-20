// app/api/registro/route.ts
// ⚠️ Solo para desarrollo: desactiva verificación de certificados
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Client as NotionClient } from "@notionhq/client";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Variables de entorno necesarias en .env.local
// NEXT_PUBLIC_SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
// EMAIL_USER
// EMAIL_PASS
// NOTION_TOKEN
// NOTION_DB_ID
// TELEGRAM_BOT_TOKEN (opcional)
// TELEGRAM_CHAT_ID (opcional)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,       // 👈 URL pública
  process.env.SUPABASE_SERVICE_ROLE_KEY!       // 👈 clave privada de servicio
);

const notion = new NotionClient({ auth: process.env.NOTION_TOKEN });

// Configuración de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type Inscripto = {
  nombre: string;
  edad: number;
  whatsapp: string;
  horario: "mañana" | "tarde";
};

function validar(data: any): Inscripto {
  const { nombre, edad, whatsapp, horario } = data || {};
  if (!nombre || typeof nombre !== "string") throw new Error("Nombre es requerido");
  if (!edad || isNaN(Number(edad))) throw new Error("Edad es requerida y debe ser número");
  if (!whatsapp || isNaN(Number(whatsapp))) throw new Error("WhatsApp es requerido y debe ser número");
  if (!horario || !["mañana", "tarde"].includes(horario))
    throw new Error("Horario debe ser 'mañana' o 'tarde'");
  return { nombre, edad: String(edad), whatsapp: String(whatsapp), horario };
}


async function guardarEnSupabase(data: Inscripto) {
  const { error } = await supabase.from("inscripciones_13_12").insert([
    {
      nombre: data.nombre,
      edad: data.edad,
      whatsapp: data.whatsapp,
      horario: data.horario,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) throw new Error(`Supabase: ${error.message}`);
}

async function enviarCorreo(data: Inscripto) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "organizador@caminatasterapeuticas.com", // cambia a tu correo real
    subject: "Nuevo inscripto - Caminatas Terapéuticas Palermo",
    html: `
      <h2>Nuevo inscripto</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Edad:</strong> ${data.edad}</p>
      <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
      <p><strong>Horario:</strong> ${data.horario}</p>
    `,
  });
}

async function enviarANotion(data: Inscripto) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ID) return;
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID! },
    properties: {
      ID: { title: [{ text: { content: data.nombre } }] },
      Nombre: { rich_text: [{ text: { content: data.nombre } }] },
      Edad: { number: Number(data.edad) },
      WhatsApp: { number: Number(data.whatsapp) },
      Horario: { select: { name: data.horario } },
      FechaInscripcion: { date: { start: new Date().toISOString() } },
      Estado: { rich_text: [{ text: { content: "Pendiente" } }] },
    },
  });
}


async function enviarATelegram(data: { nombre: string; edad: string | number; whatsapp: string; horario: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const texto =
  `📝 *Nuevo inscripto en Caminata 13-12*\n\n` +
  `👤 *Nombre:* ${data.nombre}\n` +
  `🎂 *Edad:* ${data.edad}\n` +
  `📱 *WhatsApp:* ${data.whatsapp}\n` +
  `⏰ *Horario:* ${data.horario}\n` +
  `📅 *Fecha:* ${new Date().toLocaleString("es-AR")}\n\n` +
  `✅ Registro guardado en Supabase y Notion`;


  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: texto,
    parse_mode: "Markdown" // 👈 habilita formato en negrita
  }),
});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = validar(body);

    await guardarEnSupabase(data);
    await Promise.all([
      enviarCorreo(data),
      enviarANotion(data),
      enviarATelegram(data), // opcional
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message ?? "Error" }, { status: 400 });
  }
}
