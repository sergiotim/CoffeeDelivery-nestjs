export class CreateCoffeeDto {
    nome: string
    tipo: string
    precoUnitario: number
    descricao: string
    tags: string[]
}




// model Coffee {
//     id           Int          @id @default(autoincrement())
//     nome         String
//     tipo         String
//     precoUnitario Float
//     descricao    String
//     tags         String[]
//     itensPedido  ItemOrder[]
//   }