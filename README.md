# 🌱 Caminata Vida 13-12

Landing page y dashboard interactivo para el evento **Caminatas Terapéuticas Palermo**, desarrollado con **Next.js**, **Supabase**, **Notion** y desplegado en **Vercel**.  
El proyecto integra inscripción, coordinación y estadísticas en un flujo modular y reproducible.

---

## 📐 Arquitectura del proyecto

- **Frontend:**  
  - Framework: [Next.js](https://nextjs.org/)  
  - Diseño modular con componentes reutilizables (`HeroSection`, `BenefitsSection`, `EventDetails`, `DashboardResumen`, etc.)  
  - Responsive design y accesibilidad optimizada.  

- **Backend / API:**  
  - Endpoints en `/api` para manejar inscripciones, envíos de correo y conexión con Telegram.  
  - Validación híbrida: cupos, duplicados, circuitos sin coordinador, roles sin acceso.  

- **Base de datos:**  
  - [Supabase](https://supabase.com/) como backend-as-a-service.  
  - Tablas principales:  
    - `inscripciones`  
    - `circuitos`  
    - `coordinadores`  
    - `roles`  

- **Integraciones:**  
  - **Notion**: almacenamiento paralelo de inscripciones y coordinación.  
  - **Telegram Bot**: dashboard interactivo con comandos (`/inscriptos`, `/stats`, `/circuitos`, `/roles`).  
  - **Email (SMTP)**: confirmación automática de inscripción.  

- **Deploy:**  
  - [Vercel](https://vercel.com/) con integración continua desde GitHub.  
  - Cada `git push` a `main` dispara un redeploy automático.

---

## ⚙️ Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/neuroar-sys/camina-vida13-12.git
   cd camina-vida13-12

