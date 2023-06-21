"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const searchProductsByName = process.argv[2];
if (!searchProductsByName) {
    console.log("Falta passar o nome do produto");
}
else {
    const resultadoBusca = database_1.arrayDosPordutos.filter((produto) => {
        return (produto.name.toLowerCase().includes(searchProductsByName.toLowerCase()));
    });
    console.log(resultadoBusca);
}
//# sourceMappingURL=index.js.map