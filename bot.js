// Instala primero la librería:
// npm install node-telegram-bot-api

const TelegramBot = require("node-telegram-bot-api");

// Usa tu token del bot (de BotFather)
const token = process.env.TELEGRAM_BOT_TOKEN;

// Inicializa el bot en modo polling (escucha mensajes)
const bot = new TelegramBot(token, { polling: true });

// Cada vez que alguien escribe al bot
bot.on("message", (msg) => {
  const chatId = msg.chat.id; // 👈 este es el identificador único
  const username = msg.from.username || msg.from.first_name;

  // Mostrar en consola
  console.log("Nuevo colaborador detectado:");
  console.log("chat_id:", chatId, "usuario:", username);

  // Opcional: responder al usuario con su chat_id
  bot.sendMessage(chatId, `Hola ${username}, tu chat_id es: ${chatId}`);
});
