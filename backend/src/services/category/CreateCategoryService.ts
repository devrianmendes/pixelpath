import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";

interface CreateCategory {
  name: string;
  parentName: string;
  user_id: string;
}

class CreateCategoryService {
  async execute({ name, parentName, user_id }: CreateCategory) {
    let err = new CustomError;
    let casedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    let casedParentName: string | undefined;
    parentName
      ? (casedParentName = parentName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase())
      : null;

    // Verificando se o nome da categoria ja existe no banco de dados
    const alreadyExist = await prismaClient.category.findFirst({
      where: {
        name: casedName,
      },
    });

    if (alreadyExist) {
      err.status = 401;
      err.message = "Categoria já existente.";
      throw err;
    }

    // //Criando a categoria caso não seja filha
    if (!casedParentName) {
      const category = await prismaClient.category.create({
        data: {
          name: casedName,
          createdBy: user_id,
        },
      });
      return category;
    } else {
      //Caso seja filha, pega o id da categoria mãe
      const hasParent = await prismaClient.category.findFirst({
        where: {
          name: casedParentName,
        },
      });

      //E cria como filha
      const category = await prismaClient.category.create({
        data: {
          name: casedName,
          parentCategoryId: hasParent!.id,
          createdBy: user_id,
        },
      });
      return category;
    }
  }
}

export default CreateCategoryService;
