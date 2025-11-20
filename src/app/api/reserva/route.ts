import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // acá procesás la reserva
  return NextResponse.json({ ok: true, reserva: data });
}
