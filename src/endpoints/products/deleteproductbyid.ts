import { Request, Response } from "express";
import { db } from "../../database/knex";

export const delProdById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [productsId] = await db.raw(`
      SELECT * FROM products
      WHERE product_id = "${id}"
      `);
    if (productsId[0] == "p") {
      res.status(400);
      throw new Error('Id is invalid! Has to begin with the character "p"');
    }
    await db.raw(`
      DELETE FROM products
      WHERE product_id = "${id}"
      `);
    /* const findProductsIndex = arrayDosPordutos.findIndex((arrayDosPordutos) => {
        return arrayDosPordutos.id === id;
      });
      if (findProductsIndex <= 0) {
        res.statusCode = 404;
        throw new Error('Product not found! Verify if the "id" is correct.');
      }
      arrayDosPordutos.splice(findProductsIndex, 1); */
    res.status(200).send("Produto deletado com sucesso!");
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message); //verificar depois pois error.message esta dando unkwon
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
