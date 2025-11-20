"use client";

import { useState, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import MethodSection from "@/components/sections/MethodSection";
import VideoEventFlex from "@/components/sections/VideoEventFlex";
import CountdownTimer from "@/components/conversion/CountdownTimer";
import TrustBadges from "@/components/conversion/TrustBadges";
import SocialProof from "@/components/sections/SocialProof";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    whatsapp: "",
    horario: "mañana",
  });
  const [loading, setLoading] = useState(false);

  const EVENT_DATE = "2025-12-13T09:00:00-03:00";

  // 👇 referencia al formulario
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Inscripción enviada con éxito");
        setFormData({ nombre: "", edad: "", whatsapp: "", horario: "mañana" });
        setShowForm(false);
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

  // 👇 función para mostrar formulario y hacer scroll
  const handleCTA = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-cyan-50">
      {/* Hero principal */}
      <HeroSection onOpenBooking={handleCTA} />

      {/* Beneficios terapéuticos */}
      <BenefitsSection />

      {/* Métodos */}
      <MethodSection />

      {/* Video + Detalles */}
      <VideoEventFlex />

      {/* Cuenta regresiva */}
      <CountdownTimer targetDate={EVENT_DATE} />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonios */}
      <SocialProof />

      {/* CTA Final */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="text-2xl italic text-gray-700 mb-8 max-w-3xl mx-auto">
          “Una oportunidad para caminar, sanar y compartir vida.”
        </blockquote>
        <div className="bg-emerald-50 rounded-xl p-8 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <FloatingWhatsApp />
            <button
              onClick={handleCTA}
              className="group flex flex-col items-center justify-center gap-2 
                         bg-gradient-to-r from-orange-500 to-red-500 
                         hover:from-orange-600 hover:to-red-600 
                         text-white font-extrabold text-lg 
                         py-4 px-8 rounded-full shadow-xl 
                         transform hover:scale-105 transition-all duration-300"
            >
              🚶‍♀️ ¡Reservá tu lugar ahora!
              <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Cupos limitados — confirmación inmediata
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <p className="text-gray-400">
          Organizado con ❤️ por el equipo de Camina Vida — Buenos Aires, 2025
        </p>
        <p className="text-gray-500 text-sm mt-1">sendabuena@gmail.com</p>
      </footer>

      {/* Formulario fijo en la parte inferior */}
      {showForm && (
        <section
          ref={formRef}
          className="bg-white py-12 px-6 border-t border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            ✨ Reservá tu lugar
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
              min="1"
              max="120"
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              required
            />
            <select
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 
                         text-white py-3 px-4 rounded-lg font-bold 
                         hover:from-emerald-700 hover:to-cyan-700 
                         shadow-md transition transform hover:scale-105"
            >
              {loading ? "⏳ Inscribiendo..." : "✅ Confirmar reserva"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
