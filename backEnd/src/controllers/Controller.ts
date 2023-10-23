import fetch from "node-fetch";
import { Request, Response } from "express";

export class Controller {
  async list(req: Request, res: Response): Promise<Response> {
    let data = await fetch("http://177.44.248.24/pix-api/users");
    let json = await data.json();
    return res.status(200).json(json);
  }

  async pix(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pegamos o body da requisição e nele conseguimos pegar os dados que o usuário enviou

    let data = await fetch(
      `http://177.44.248.24/pix-api/pix/${body.nome}/${body.tipo}`
    ); //fazemos uma requisição para a api passando os parametros que o usuário enviou
    let json = await data.json(); //pegamos a resposta da api e transformamos em json
    return res.status(200).json(json); //retornamos a resposta da api para o usuário
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pegamos o body da requisição e nele conseguimos pegar os dados que o usuário enviou
    
    let payload = {
      senderId: body.remetente,
      recipientId: body.destinatario,
      value: body.valor,
    };

    let data = await fetch(`http://177.44.248.24/pix-api/pix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    let json = await data.json();
    return res.status(200).json(json);
  }
}
