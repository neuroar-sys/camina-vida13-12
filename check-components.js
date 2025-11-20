const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "src/components");

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (file.endsWith(".tsx")) {
      callback(filepath);
    }
  });
}

function checkFile(filepath) {
  const content = fs.readFileSync(filepath, "utf8");

  // 1. Verificar "use client"
  if (content.includes("useState") || content.includes("useEffect")) {
    if (!content.startsWith('"use client"')) {
      console.log(`⚠️ Falta "use client" en: ${filepath}`);
    }
  }

  // 2. Verificar react-icons
  if (content.includes("react-icons") && !content.includes("import")) {
    console.log(`⚠️ Import de react-icons incorrecto en: ${filepath}`);
  }

  // 3. Verificar export default
  if (!content.includes("export default")) {
    console.log(`⚠️ Falta export default en: ${filepath}`);
  }

  // 4. Revisar objetos literales en JSX
  if (content.match(/<\{.*\}>/)) {
    console.log(`⚠️ Posible objeto literal en JSX en: ${filepath}`);
  }
}

// Ejecutar revisión
console.log("🔍 Revisando componentes...");
walk(SRC_DIR, checkFile);

// Revisar imports en page.tsx
const pagePath = path.join(__dirname, "src/app/page.tsx");
if (fs.existsSync(pagePath)) {
  const pageContent = fs.readFileSync(pagePath, "utf8");
  const expectedImports = [
    "@/components/sections/HeroSection",
    "@/components/sections/BenefitsSection",
    "@/components/sections/EventDetails"
  ];
  expectedImports.forEach(imp => {
    if (!pageContent.includes(imp)) {
      console.log(`⚠️ Import faltante en page.tsx: ${imp}`);
    }
  });
}

console.log("✅ Revisión completa");
