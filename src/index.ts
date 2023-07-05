import {
  arrayDosUsuarios,
  arrayDosPordutos,
  createAllUsers,
  createProduct,
  searchProductsByName,
} from "./database";
import express, { Request, Response } from "express";
import { TProducts, TUsers } from "./types";

/* console.table(arrayDosUsuarios)
console.table(arrayDosPordutos) */

/* createAllUsers("u003", "Astrodev", "astrodev@email.com", "astrodev99")
console.table(arrayDosUsuarios)
createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.")
console.table(arrayDosPordutos) */

/* console.log(searchProductsByName)  */

const app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// TESTANDO
app.get("/", (req: Request, res: Response) => {
  res.send("Nada!");
});

// GET ALL USERS
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(arrayDosUsuarios);
});

// GET ALL PRODUCTS
app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(arrayDosPordutos);
});

// GET PRODUCTS BY NAME
app.get("/products/search", (req: Request, res: Response) => {
  //const {name} = req.query
  const name = req.query.name as string;

  if (!name) {
    res.status(403).send("Parametro de busca nao informado");
  }

  const productsByName = arrayDosPordutos.filter((product) => {
    return product.name.toLowerCase().includes(name.toLowerCase());
  });

  res.status(200).send(productsByName);
});

//ADD NOVO USUARIO
app.post("/users", (req: Request, res: Response) => {
  //const body = req.body -> id: body.id
  const { id, name, email, password } = req.body;
  // se tiver ENUM -> if(id!==ALGUMACOISA.ID01 && enum!==ALGUMACOISA.ID02)
  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  arrayDosUsuarios.push(newUser);
  res.status(201).send("Usuario registrado com sucesso!");
  console.log(arrayDosUsuarios);
});

// ADD NOVO PRODUTO
app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl } = req.body;

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  arrayDosPordutos.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
  console.log(arrayDosPordutos);
});

//PROCURA USER PELO ID
app.get("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id) {
      const findUsersId = arrayDosUsuarios.find(
        (arrayDosUsuarios) => arrayDosUsuarios.id === id
      );
      if(!findUsersId){
        throw new Error('User not found! Verify if the "id" is correct.' )
      }
      res.status(200).send(findUsersId);
    }
  } catch (error){
    res.status(404).send(error.message)
  }
});

//DELETA O USER POR ID
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const findUsersIndex = arrayDosUsuarios.findIndex((arrayDosUsuarios) => {
    return arrayDosUsuarios.id === id;
  });
  arrayDosUsuarios.splice(findUsersIndex, 1);
  res.status(200).send("Usuario deletado com sucesso!");
});

// DELETA O PRODUTO POR ID
app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const findProductsIndex = arrayDosPordutos.findIndex((arrayDosPordutos) => {
    return arrayDosPordutos.id === id;
  });
  arrayDosPordutos.splice(findProductsIndex, 1);
  res.status(200).send("Produto deletado com sucesso!");
});

// EDITA PRODUTO POR ID
app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { id: newId, name, price, description, imageUrl } = req.body;

  const findProducts = arrayDosPordutos.find((arrayDosPordutos) => {
    return arrayDosPordutos.id === id;
  });

  if (findProducts) {
    findProducts.id = newId || findProducts.id;
    findProducts.name = name || findProducts.name;
    findProducts.price = price || findProducts.price;
    findProducts.description = description || findProducts.description;
    findProducts.imageUrl = imageUrl || findProducts.imageUrl;
    res.status(200).send("Atualizacao realizada com sucesso!");
  } else {
    res.status(200).send("Produto nao encontrado!");
  }
});
