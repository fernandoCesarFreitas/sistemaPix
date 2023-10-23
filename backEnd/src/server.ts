import express, { Express,Request,Response, NextFunction } from "express";
import cors from "cors";
import controllerRoutes from './routes/rotas';
let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(express.json());

// server.use((req:Request, res:Response, next: NextFunction)=>{
//   console.log('['+(new Date)+ ']'+req.method +' '+req.url);
//   next();
// });

// chama a rota de usuarios
server.use(controllerRoutes);

// iniciar servidor
export default {
  start() {
    server.listen(port, () => {
      console.log("servidor iniciado na porta 3000");
    });
  },
};
