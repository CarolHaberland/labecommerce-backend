import { Request, Response } from "express";
import { db } from "../../database/knex";
import { TPurchase } from "../../types/types";

export const createPurchase = async (
  req: Request<{}, TPurchase, TPurchase>,
  res: Response
) => {
  try {
    const { id, buyer, products } = req.body;
    if (!id || !buyer || !products) {
      res.status(400);
      throw new Error("Incomple information log.");
    }

    const order = [];

    for (const product of [products]) {
      const [productExists] = await db("products").where({ id: product.id });
      order.push(productExists);
    }
    const newPurchase = {
      id,
      buyer,
      products,
    };
    await db("purchases").insert(newPurchase);

    for (const product of [products]) {
      const newPurchProduct = {
        purchases_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };
      await db("purchases_products").insert(newPurchProduct);
    }
    res.status(201).send("Purchase successfully registered!");
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message);
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
