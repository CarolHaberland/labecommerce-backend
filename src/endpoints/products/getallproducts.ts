import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getallproducts = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select("*")
      .from("products"); /* .raw(`SELECT * FROM products`) */
    res.status(200).send(result);
  } catch {
    res.status(500).send("Unkwon error.");
  }
};
