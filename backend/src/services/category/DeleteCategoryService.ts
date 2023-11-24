import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";

class DeleteCategoryService {
  async execute({name}: {name: string}) {
    //Variável que irá tratar os erros
    let err = new CustomError();
    const casedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    //Pega o id da categoria que deseja deletar
    const category = await prismaClient.category.findFirst({
      where: {
        name: casedName,
      },
    });

    //Se a categoria não existe, irá retornar um erro
    if (!category) {
      err.status = 404;
      err.message = "Categoria inexistente.";
      throw err;
    }

    //Verifica se a categoria é mãe de outra
    const hasChildren = await prismaClient.category.findFirst({
      where: {
        parentCategoryId: category.id,
      },
    });

    //Se for, impede de deletar até que não haja dependentes
    if (hasChildren) {
      err.status = 403;
      err.message = "Categorias com dependentes não pode ser deletada.";
      throw err;
    } else {
      const delcat = await prismaClient.category.delete({
        where: {
          id: category.id,
        },
      });
      return delcat;
    }
  }
}

export default DeleteCategoryService;
