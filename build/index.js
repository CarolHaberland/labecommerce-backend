"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
var cors = require("cors");
app.use(express_1.default.json());
app.use(cors());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/", (req, res) => {
    res.send("Nada!");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.arrayDosUsuarios);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.arrayDosPordutos);
});
app.get("/products/search", (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(403).send("Parametro de busca nao informado");
    }
    const productsByName = database_1.arrayDosPordutos.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
    res.status(200).send(productsByName);
});
app.post("/users", (req, res) => {
    const { id, name, email, password } = req.body;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    database_1.arrayDosUsuarios.push(newUser);
    res.status(201).send("Usuario registrado com sucesso!");
    console.log(database_1.arrayDosUsuarios);
});
app.post("/products", (req, res) => {
    const { id, name, price, description, imageUrl } = req.body;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    database_1.arrayDosPordutos.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
    console.log(database_1.arrayDosPordutos);
});
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const findUsersId = database_1.arrayDosUsuarios.find((arrayDosUsuarios) => arrayDosUsuarios.id === id);
    res.status(200).send(findUsersId);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const findUsersIndex = database_1.arrayDosUsuarios.findIndex((arrayDosUsuarios) => {
        return arrayDosUsuarios.id === id;
    });
    database_1.arrayDosUsuarios.splice(findUsersIndex, 1);
    res.status(200).send("Usuario deletado com sucesso!");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const findProductsIndex = database_1.arrayDosPordutos.findIndex((arrayDosPordutos) => {
        return arrayDosPordutos.id === id;
    });
    database_1.arrayDosPordutos.splice(findProductsIndex, 1);
    res.status(200).send("Produto deletado com sucesso!");
});
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { id: newId, name, price, description, imageUrl } = req.body;
    const findProducts = database_1.arrayDosPordutos.find((arrayDosPordutos) => {
        return arrayDosPordutos.id === id;
    });
    if (findProducts) {
        findProducts.id = newId || findProducts.id;
        findProducts.name = name || findProducts.name;
        findProducts.price = price || findProducts.price;
        findProducts.description = description || findProducts.description;
        findProducts.imageUrl = imageUrl || findProducts.imageUrl;
        res.status(200).send("Atualizacao realizada com sucesso!");
    }
    else {
        res.status(200).send("Produto nao encontrado!");
    }
});
//# sourceMappingURL=index.js.map