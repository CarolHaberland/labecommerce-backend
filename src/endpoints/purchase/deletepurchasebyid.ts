import { Request, Response } from "express";
import { db } from "../../database/knex";

export const delPurchById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [purchasesId] = await db("purchases").where({ id: id });
    /*  if (purchasesId !== undefined) {
        if (typeof purchasesId !== "string") {
          res.status(400);
          throw new Error("Id is invalid! Only characteres allowed.");
        }
        if (purchasesId !== "pur") {
        res.status(400);
        throw new Error('Id is invalid! Has to begin with the character "pur"');
        }
      } */

    await db("purchases").del().where({ id: id });
    res.status(200).send("Pedido deletado com sucesso!");
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message); //verificar depois pois error.message esta dando unkwon
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
