import { Request, Response } from "express";
import { db } from "../../database/knex";

export const createNewProd = async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    /* const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl,
      };
      const findProductsId = arrayDosPordutos.find(
        (arrayDosPordutos) => arrayDosPordutos.id === id
      );
      if (findProductsId) {
        res.status(400);
        throw new Error("This Id already exist!");
      } */
    /* if(id !== undefined){
        if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id is invalid! Only characteres allowed.");
       }
      } */
    const newProduct = {
      product_id: id,
      name: name,
      price: price,
      description: description,
      image_url: imageUrl,
    };
    await db("products").insert(newProduct); /* .raw(`
          INSERT INTO products (id, name, price, description, image_url)
            VALUES ("${id}", "${name}", ${price}, "${description}", "${imageUrl}")
      `); */

    /* arrayDosPordutos.push(newProduct) */
    res.status(201).send("Product successfully registered!");
    /* console.log(arrayDosPordutos); */
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message);
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
