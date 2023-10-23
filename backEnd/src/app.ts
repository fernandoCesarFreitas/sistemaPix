import DB from "./db";
import server from "./server";

async function main(): Promise<void> {
  // await DB.initialize();//inicializa o banco de dados mais neste caso não é necessário

  server.start();
}

main();


