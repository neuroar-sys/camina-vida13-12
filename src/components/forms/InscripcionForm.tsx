"use client";
import { useState } from "react";

export default function InscripcionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    whatsapp: "",
    horario: "mañana",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Inscripción enviada con éxito");
        setFormData({ nombre: "", edad: "", whatsapp: "", horario: "mañana" });
        if (onSuccess) onSuccess();
      } else {
        alert("❌ Error al enviar inscripción");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={formData.nombre}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      />
      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={formData.edad}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      />
      <input
        type="tel"
        name="whatsapp"
        placeholder="WhatsApp"
        value={formData.whatsapp}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      />
      <select
        name="horario"
        value={formData.horario}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="mañana">Mañana</option>
        <option value="tarde">Tarde</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition"
      >
        {loading ? "Enviando..." : "Confirmar reserva"}
      </button>
    </form>
  );
}
