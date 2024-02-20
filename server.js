require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const generateGuide = require("./generateGuide"); // Ruta al nuevo archivo
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const API_KEY = process.env.API_KEY;

let guiaCounter = 0;

// Middleware para servir la página web
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Configurar conexión de Socket.io
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Enviar el contador actual al cliente
  io.emit("updateCounter", guiaCounter);
});

// Generar guía aleatoria cada 5 minutos
setInterval(async () => {
  const {
    guiaCounter: newCounter,
    result,
    error,
  } = await generateGuide(guiaCounter, API_KEY);

  if (result) {
    // Actualizar el contador y emitir a los clientes
    guiaCounter = newCounter;
    io.emit("updateCounter", guiaCounter);
  } else if (error) {
    // Manejar el error si es necesario
    console.error("Error en la generación de guía:", error);
  }
}, 300000); // Intervalo de 5 minutos

// Iniciar el servidor
const PORT = process.env.PORT || 3000; //Usar el puerto 3000 si el PORT no está definido en el archivo .env
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
