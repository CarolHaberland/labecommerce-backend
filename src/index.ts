import { arrayDosUsuarios, arrayDosPordutos, createAllUsers, createProduct } from "./database"


/* console.table(arrayDosUsuarios)
console.table(arrayDosPordutos) */

/* createAllUsers("u003", "Astrodev", "astrodev@email.com", "astrodev99")
console.table(arrayDosUsuarios)
createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.")
console.table(arrayDosPordutos) */

const searchProductsByName = process.argv[2]
if(!searchProductsByName){
  console.log("Falta passar o nome do produto")
}else{
  const resultadoBusca = arrayDosPordutos.filter((produto) =>{
    return(produto.name.toLowerCase().includes(searchProductsByName.toLowerCase()))
  })
  console.log(resultadoBusca)
}