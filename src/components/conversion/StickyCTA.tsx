// components/conversion/StickyCTA.tsx
'use client';
import { useState, useEffect } from 'react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 z-50 md:hidden">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900">$6.000</p>
          <p className="text-sm text-gray-600">13 de Diciembre</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Reservar ahora
        </button>
      </div>
    </div>
  );
}