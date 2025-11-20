// src/app/api/export-to-notion/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // 1. Obtener inscripciones desde Supabase
    const { data, error } = await supabase
      .from("inscripciones_13_12")
      .select("*");

    if (error) throw error;

    // 2. Insertar cada inscripción en Notion
    for (const inscripcion of data) {
      await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Nombre: { title: [{ text: { content: inscripcion.nombre } }] },
            Edad: { number: inscripcion.edad },
            WhatsApp: { rich_text: [{ text: { content: inscripcion.whatsapp } }] },
            Horario: { select: { name: inscripcion.horario } },
            FechaInscripcion: { date: { start: inscripcion.created_at } },
            Estado: { select: { name: "Confirmado" } }, // o dinámico según tu lógica
          },
        }),
      });
    }

    return NextResponse.json({ ok: true, count: data.length });
  } catch (err: any) {
    console.error("Error exportando a Notion:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
