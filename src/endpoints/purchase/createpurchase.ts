import { Request, Response } from "express"
import { db } from "../../database/knex";
import { TPurchase } from "../../types";

export const createPurchase =  async (req: Request<{}, TPurchase, TPurchase>, res: Response) => {
    try {
      const { id, buyer, products } = req.body;
      if(!id || !buyer || !products){
      res.status(400);
    throw new Error('Incomple information log.')
    } 
      await db("purchases").insert({ id, buyer });

     /*  for(const product of products) {
      const {id: productId, quantity} = product
      await db('purchases_products').insert({purchases_id: id, product_id: productId, quantity})
    }  */

      res.status(201).send("Purchase successfully registered!");
    } catch (e) {
      if (e instanceof Error) {
        res.send(e.message);
      } else {
        res.status(500).send("Unkwon error.");
      }
    }
  }