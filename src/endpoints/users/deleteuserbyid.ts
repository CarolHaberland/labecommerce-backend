import { Request, Response } from "express";
import { db } from "../../database/knex";

export const delUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [userId] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}"
      `);
    if (userId && userId[0] !== "u") {
      res.status(400);
      throw new Error('Id is invalid! Has to begin with the character "u"');
    }
    await db.raw(`
      DELETE FROM users
      WHERE id = "${id}"
      `);
    /* const findUsersId = arrayDosUsuarios.find(
        (arrayDosUsuarios) => arrayDosUsuarios.id === id
      ); */
    /* const findUsersIndex = arrayDosUsuarios.findIndex((arrayDosUsuarios) => {
        return arrayDosUsuarios.id === id;
      });
      if (findUsersIndex <= 0) {
        res.statusCode = 404;
        throw new Error('User not found! Verify if the "id" is correct.');
      }
      arrayDosUsuarios.splice(findUsersIndex, 1); */
    res.status(200).send("Usuario deletado com sucesso!");
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message); //verificar depois pois error.message esta dando unkwon
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
