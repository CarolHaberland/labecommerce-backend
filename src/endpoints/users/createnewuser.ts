import { Request, Response } from "express";
import { db } from "../../database/knex";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    //const body = req.body -> id: body.id
    const { id, name, email, password } = req.body;
    // se tiver ENUM -> if(id!==ALGUMACOISA.ID01 && enum!==ALGUMACOISA.ID02)
    if (!id || !name || !email || !password) {
      res.status(400);
      throw new Error("Invalid Information");
    }
    await db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES ("${id}", "${name}", "${email}", "${password}")
      `);
    /* const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };
      const findUsersId = arrayDosUsuarios.find(
        (arrayDosUsuarios) => arrayDosUsuarios.id === id
      );
      const findUserEmail = arrayDosUsuarios.find((arrayDosUsuarios)=> arrayDosUsuarios.email === email)
      if(findUsersId){
        res.status(400)
        throw new Error("This Id already exist!")
      }
      if(findUserEmail){
        res.status(400)
        throw new Error("This Email already exist!")
      }
      arrayDosUsuarios.push(newUser); */
    res.status(201).send("Usuario registrado com sucesso!");
    /* console.log(arrayDosUsuarios); */
  } catch (e) {
    if (e instanceof Error) {
      res.send(e.message);
    } else {
      res.status(500).send("Unkwon error.");
    }
  }
};
