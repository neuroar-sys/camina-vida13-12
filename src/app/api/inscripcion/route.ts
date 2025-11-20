// src/app/api/inscripcion/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase"; // 👈 importamos el cliente centralizado

// Helper para crear transporter según entorno
function createTransporter() {
  const isLocal = process.env.NODE_ENV !== "production";

  if (isLocal) {
    // 🚧 Local: bypass de certificados autofirmados
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password de Gmail
      },
      tls: {
        rejectUnauthorized: false, // ⚠️ solo en local
      },
    });
  }

  // ✅ Producción: configuración segura
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password de Gmail
    },
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Crear transporter según entorno
    const transporter = createTransporter();

    // 2. Enviar correo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "sendabuena@gmail.com",
      subject: "Nueva inscripción Caminata Terapéutica",
      text: `Nombre: ${data.nombre}\nEdad: ${data.edad}\nWhatsApp: ${data.whatsapp}\nHorario: ${data.horario}`,
    });

    // 3. Guardar en Supabase
    const { error } = await supabase.from("inscripciones_13_12").insert([
      {
        nombre: data.nombre,
        edad: parseInt(data.edad),
        whatsapp: data.whatsapp,
        horario: data.horario,
      },
    ]);

    if (error) {
      console.error("Error al insertar en Supabase:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Error en API /inscripcion:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Error interno" },
      { status: 500 }
    );
  }
}
