import { Request, Response } from "express";
import { db } from "../../database/knex";

export const editProdById =  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { id: newId, name, price, description, imageUrl } = req.body;
  
      if (newId !== undefined) {
        if (typeof newId !== "string") {
          res.status(400);
          throw new Error("Id is invalid! Only characteres allowed.");
        }
        if (newId === newId) {
          res.status(400);
          throw new Error("Id already exist! Please verify and try again.");
        }
      }
      const [ product ] = await db.select("*").from("products").where({ product_id: id })
     /*  const findProducts = arrayDosPordutos.find((arrayDosPordutos) => {
        return arrayDosPordutos.id === id;
      }); */
      await db.update({
        id: newId || product.id,
        name: name || product.name,
        price: price || product.price,
        description: description || product.description,
        imageUrl: imageUrl || product.image_url,
        
      }).from("products").where({ product_id: id })
      res.status(200).send("Atualizacao realizada com sucesso!")
  
      /* if (findProducts) {
        findProducts.id = newId || findProducts.id;
        findProducts.name = name || findProducts.name;
        findProducts.price = price || findProducts.price;
        findProducts.description = description || findProducts.description;
        findProducts.imageUrl = imageUrl || findProducts.imageUrl;
  
        res.status(200).send("Atualizacao realizada com sucesso!");
      } */
    } catch (e) {
      if (e instanceof Error) {
        res.send(e.message); //verificar depois pois error.message esta dando unkwon
      } else {
        res.status(500).send("Unkwon error.");
      }
    }
  }