"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.getAllUsers = exports.createProduct = exports.createAllUsers = exports.arrayDosPordutos = exports.arrayDosUsuarios = void 0;
exports.arrayDosUsuarios = [
    {
        id: "u001",
        name: "fulano",
        email: "fulando@email.com",
        password: "123456",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "ciclano",
        email: "fciclano@email.com",
        password: "12345678",
        createdAt: new Date().toISOString(),
    },
];
exports.arrayDosPordutos = [
    {
        id: "p001",
        name: "Placa de video",
        price: 890,
        description: "Placa de video para computador",
        imageUrl: "link da imagem",
    },
    {
        id: "p002",
        name: "Headset Logitech",
        price: 300,
        description: "Placa de mae para computador",
        imageUrl: "link da imagem 2",
    },
];
function createAllUsers(id, name, email, password) {
    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
    };
    exports.arrayDosUsuarios.push(newUser);
    return "Cadastro realizado com sucesso";
}
exports.createAllUsers = createAllUsers;
function createProduct(id, name, price, description) {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: "link da imagem 3"
    };
    exports.arrayDosPordutos.push(newProduct);
    return "Cadastro realizado com sucesso";
}
exports.createProduct = createProduct;
exports.getAllUsers = [...exports.arrayDosUsuarios, createAllUsers];
exports.getAllProducts = [...exports.arrayDosPordutos, createProduct];
exports.searchProductsByName = process.argv[2];
if (!exports.searchProductsByName) {
    console.log("Falta passar o nome do produto");
}
else {
    const resultadoBusca = exports.arrayDosPordutos.filter((produto) => {
        return (produto.name.toLowerCase().includes(exports.searchProductsByName.toLowerCase()));
    });
    console.log(resultadoBusca);
}
//# sourceMappingURL=database.js.map