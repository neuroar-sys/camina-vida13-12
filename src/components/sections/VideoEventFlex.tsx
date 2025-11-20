"use client";
import EventDetails from "@/components/sections/EventDetails";

export default function VideoEventFlexBig() {
  return (
     <section className="py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row items-start">
      {/* Video */}
      <div className="w-full lg:w-[65%]">
        <div className="w-full max-w-2xl h-[400px] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.youtube.com/embed/HrtM--OrGFY"
            title="Video Caminata Terapéutica"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Detalles del evento — pegado al video en desktop */}
      <div className="w-full lg:w-[35%]">
        <EventDetails />
      </div>
    </div>
  </div>
</section>
  );
}
