import { Request, Response } from "express"
import { db } from "../../database/knex";

export const getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const [userId] = await db("users").where({ id: id }); /* .raw(`
      SELECT * FROM users
      WHERE id = "${id}"
      ` */
      if (userId == "u") {
        res.status(400);
        throw new Error('Id is invalid! Has to begin with the character "u"');
      }
      /*  const findUsersId = arrayDosUsuarios.find(
        (arrayDosUsuarios) => arrayDosUsuarios.id === id
      ); */
      if (!userId) {
        res.statusCode = 404;
        throw new Error('User not found! Verify if the "id" is correct.');
      }
      res.status(200).send(userId);
    } catch (e) {
      if (e instanceof Error) {
        res.send(e.message); //verificar depois pois error.message esta dando unkwon
      } else {
        res.status(500).send("Unkwon error.");
      }
    }
  }