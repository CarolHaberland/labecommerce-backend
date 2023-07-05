import { TProducts, TUsers } from "./types";

export const arrayDosUsuarios: Array<TUsers> = [
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

export const arrayDosPordutos: Array<TProducts> = [
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


export function createAllUsers(
  id: string,
  name: string,
  email: string,
  password: string
) {
  const newUser = {
    id: id,
    name: name,
    email: email,
    password: password,
    createdAt: new Date().toISOString(),
  }
  arrayDosUsuarios.push(newUser)

  return "Cadastro realizado com sucesso"
  
}

export function createProduct(
    id: string,
    name: string,
    price: number,
    description: string
  ) {
    const newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      imageUrl: "link da imagem 3"
    }
    arrayDosPordutos.push(newProduct)
  
    return "Cadastro realizado com sucesso"
    
  }

  export const getAllUsers = [...arrayDosUsuarios, createAllUsers]

  export const getAllProducts = [...arrayDosPordutos, createProduct]


  export const searchProductsByName = process.argv[2]
  if(!searchProductsByName){
    console.log("Falta passar o nome do produto")
  }else{
    const resultadoBusca = arrayDosPordutos.filter((produto) =>{
      return(produto.name.toLowerCase().includes(searchProductsByName.toLowerCase()))
    })
    console.log(resultadoBusca)
  }