import express from "express";
import { Server } from "http";

export const startServer = async () => {
  const app = express();

  const server = app.listen(process.env.PORT || 8080);
  announce(server, process.env.NODE_ENV || "dev");
  return async function stopServer() {
    await new Promise(resolve => server.close(resolve));
  };
};

function announce(server: Server, env: string) {
  const address = server.address();
  let msg = `🚀 ${env.toUpperCase()}: Barebones Server up and running `;
  if (typeof address === "string") {
    msg += `on ${address}`;
  } else if (address !== null) {
    msg += `on ${address.family} ${address.address} port ${address.port}`;
  }
  console.log(msg + "🚀");
}

startServer();
