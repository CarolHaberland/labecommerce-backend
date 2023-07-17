import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select("*")
      .from("users"); /* .raw(`SELECT * FROM users`); */
    res.status(200).send(result);
  } catch {
    res.status(500).send("Unkwon error.");
  }
};
