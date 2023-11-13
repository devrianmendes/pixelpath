import prismaClient from "../../prisma";

class DeleteCategoryService {
  async execute({name}) {

    //Pega o id da categoria que deseja deletar
    const category = await prismaClient.category.findFirst({
        where: {
            name: name
        }
    })

    if(!category) {
        throw new Error("Item inexistente.");
    }

    //Verifica se a categoria é mãe de outra
    const hasChildren = await prismaClient.category.findFirst({
        where: {
            parentCategoryId: category.id
        }
    })

    //Se for, impede de deletar até que não haja dependentes
    if(hasChildren) {
        throw new Error("Essa categoria possui dependente(s). Não será possível deleta-la até que não haja mais dependentes.");
        } else {
            console.log(`Categoria ${name} não possuía dependentes e foi apagada do banco de dados.`);
            const delcat = await prismaClient.category.delete({
                where: {
                    id: category.id
                }
            })
            return delcat;
        }
    }
}

export default DeleteCategoryService;