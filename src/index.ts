
import express, { Request, Response } from "express";
/* import { TProducts, TPurchase, TUsers } from "./types";
import { db } from "./database/knex" */;
import { getAllUsers } from "./endpoints/users/getallusers";
import { getallproducts } from "./endpoints/products/getallproducts";
import { getProdByName } from "./endpoints/products/getproductbyname";
import { getProdById } from "./endpoints/products/getproductsbyid";
import { delProdById } from "./endpoints/products/deleteproductbyid";
import { editProdById } from "./endpoints/products/editproductsbyid";
import { createNewProd } from "./endpoints/products/createnewproduct";
import { createNewUser } from "./endpoints/users/createnewuser";
import { getUserById } from "./endpoints/users/getuserbyid";
import { delUserById } from "./endpoints/users/deleteuserbyid";
import { createPurchase } from "./endpoints/purchase/createpurchase";
import { getPurchById } from "./endpoints/purchase/getpurchasebyid";
import { delPurchById } from "./endpoints/purchase/deletepurchasebyid";

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
app.get("/users", getAllUsers);

// GET ALL PRODUCTS
app.get("/products", getallproducts);

// GET PRODUCTS BY NAME
app.get("/products/search", getProdByName);

//CRIAR NOVO USUARIO
app.post("/users", createNewUser);

// CRIAR NOVO PRODUTO
app.post("/products", createNewProd);

// CREATE PERCHASE (POST)
app.post("/purchase", createPurchase);

//PROCURA USER PELO ID
app.get("/users/:id", getUserById);

//PROCURAR PRODUTO POR ID
app.get("/products/:id", getProdById);

// GET PURCHASE BY ID (GET)
app.get("/purchase/:id", getPurchById);

// DELETE PURCHASE BY ID (DELETE)
app.delete("/purchases/:id", delPurchById);

//DELETA O USER POR ID
app.delete("/users/:id", delUserById);

// DELETA O PRODUTO POR ID
app.delete("/products/:id", delProdById);

// EDITA PRODUTO POR ID (PUT)
app.put("/products/:id", editProdById);
