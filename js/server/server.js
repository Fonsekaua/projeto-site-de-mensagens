const { WebSocketServer } = require("ws");

const dotenv = require("dotenv");
dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    // Confirma que a conexão está aberta antes de enviar
    if (ws.readyState === ws.OPEN) {
        ws.send("Mensagem do servidor princesa!!!");
    }

    ws.on("message", (data) => {
        console.log(data.toString());

        // Envia apenas para clientes com conexão aberta
        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(data.toString());
            }
        });
    });

    console.log("client connected");
});
