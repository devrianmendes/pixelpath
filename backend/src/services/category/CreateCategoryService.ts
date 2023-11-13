import prismaClient from "../../prisma";

interface CreateCategory {
  name: string
  parentName: string
}

class CreateCategoryService {
  async execute({name, parentName}: CreateCategory) {

    //Verificando se o nome da categoria ja existe no banco de dados
    const alreadyExist = await prismaClient.category.findFirst({ 
      where: {
        name: name
      }
    })

    if(alreadyExist) {
      throw new Error("Essa categoria já existe.");
    }
    
    //Criando a categoria caso não seja filha
    if(!parentName) {
      const category = await prismaClient.category.create({
        data: {
          name: name
        }
      })
      return category;

    } else {
    
      //Caso seja filha, pega o id da categoria mãe
      const { id } = await prismaClient.category.findFirst({
        where: {
          name: parentName
        }
      })

      //E cria como filha
      const category = await prismaClient.category.create({
        data: {
          name: name,
          parentCategoryId: id
        }
      })
      return category;
    }
  }
}

export default CreateCategoryService;