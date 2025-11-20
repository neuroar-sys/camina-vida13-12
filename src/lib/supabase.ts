// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Usamos las variables de entorno definidas en .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Exportamos un cliente único para usar en todo el proyecto
export const supabase = createClient(supabaseUrl, supabaseKey);
