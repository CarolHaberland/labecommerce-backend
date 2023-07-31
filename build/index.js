"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
;
const getallusers_1 = require("./endpoints/users/getallusers");
const getallproducts_1 = require("./endpoints/products/getallproducts");
const getproductbyname_1 = require("./endpoints/products/getproductbyname");
const getproductsbyid_1 = require("./endpoints/products/getproductsbyid");
const deleteproductbyid_1 = require("./endpoints/products/deleteproductbyid");
const editproductsbyid_1 = require("./endpoints/products/editproductsbyid");
const createnewproduct_1 = require("./endpoints/products/createnewproduct");
const createnewuser_1 = require("./endpoints/users/createnewuser");
const getuserbyid_1 = require("./endpoints/users/getuserbyid");
const deleteuserbyid_1 = require("./endpoints/users/deleteuserbyid");
const createpurchase_1 = require("./endpoints/purchase/createpurchase");
const getpurchasebyid_1 = require("./endpoints/purchase/getpurchasebyid");
const deletepurchasebyid_1 = require("./endpoints/purchase/deletepurchasebyid");
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
app.get("/users", getallusers_1.getAllUsers);
app.get("/products", getallproducts_1.getallproducts);
app.get("/products/search", getproductbyname_1.getProdByName);
app.post("/users", createnewuser_1.createNewUser);
app.post("/products", createnewproduct_1.createNewProd);
app.post("/purchase", createpurchase_1.createPurchase);
app.get("/users/:id", getuserbyid_1.getUserById);
app.get("/products/:id", getproductsbyid_1.getProdById);
app.get("/purchase/:id", getpurchasebyid_1.getPurchById);
app.delete("/purchases/:id", deletepurchasebyid_1.delPurchById);
app.delete("/users/:id", deleteuserbyid_1.delUserById);
app.delete("/products/:id", deleteproductbyid_1.delProdById);
app.put("/products/:id", editproductsbyid_1.editProdById);
//# sourceMappingURL=index.js.map