import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getProdById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const [productId] = await db("products").where({
        product_id: id,
      }); /* .raw(`
      SELECT * FROM products
      WHERE product_id = "${id}"
      `) */
      if (productId == "p") {
        res.status(400);
        throw new Error('Id is invalid! Has to begin with the character "p"');
      }
      /* const findProductsId = arrayDosPordutos.find(
        (arrayDosPordutos) => arrayDosPordutos.id === id
      ); */
      if (!productId) {
        res.statusCode = 404;
        throw new Error('Products not found! Verify if the "id" is correct.');
      }
      res.status(200).send(productId);
    } catch (e) {
      if (e instanceof Error) {
        res.send(e.message);
      } else {
        res.status(500).send("Unkwon error.");
      }
    }
  }