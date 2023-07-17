import { Request, Response } from "express";
import { db } from "../../database/knex";
import { TPurchase } from "../../types/types";

export const getPurchById = async (req: Request, res: Response) => {
  try {
    const idPurchase = req.params.id;
    if (idPurchase !== undefined) {
      if (typeof idPurchase !== "string" || idPurchase === "") {
        res.status(400);
        throw new Error("The value has to be a non-empty string");
      }
    }

    const [purchase] = await db("purchases")
      .select(
        "purchases.id AS purchaseId",
        "purchases.buyer AS buyerId",
        "users.name AS buyerName",
        "users.email AS buyerEmail",
        "purchases.total_price AS totalPrice",
        "purchases.created_at AS createdAt"
      )
      .innerJoin("users", "purchases.buyer", "=", "users.id")
      .where({ "purchases.id": idPurchase });

    if (!purchase) {
      res.status(400);
      throw new Error("Purchase not found!");
    }

    const resultPurch = await db("purchases_products")
      .select(
        "products.product_id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url AS imageUrl",
        "purchases_products.quantity"
      )
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.product_id"
      )
      .where({ "purchases_products.purchases_id": idPurchase });

    /*  for(const product of resultPurch) {
        const {id: productId, quantity} = product
        await db('purchases_products').insert({purchases_id: idPurchase, product_id: productId, quantity})
      } */

    if (resultPurch.length === 0) {
      res.status(400);
      throw new Error("No purchases found!");
    }

    const result: TPurchase = {
      ...purchase,
      products: resultPurch,
    };
    res.status(200).send(result);
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message); //verificar depois pois error.message esta dando unkwon
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
