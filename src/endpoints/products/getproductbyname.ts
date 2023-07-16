import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getProdByName = async (req: Request, res: Response) => {
  //const {name} = req.query
  try {
    const name = req.query.name as string;
    
    const [productName] = await db("products").where('name', 'like', `%${name}%` );

    if (!name) {
      res.status(403).send("Search parameter not informed!");
    }

    /* const productsByName = arrayDosPordutos.filter((product) => {
      return product.name.toLowerCase().includes(name.toLowerCase());
    }); */

    res.status(200).send(productName);
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message);
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
