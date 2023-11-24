import prismaClient from "../../prisma";

class ListByCategoryService {
  async execute(name: string) {
    const casedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    try {
      const id = await prismaClient.category.findFirst({
        where: {
          name: casedName,
        },
      });

      const list = await prismaClient.product.findMany({
        where: {
          categoryId: id!.id,
        },
        include: {
          productDetails: true,
        },
      });

      return list;
    } catch (err) {
      return err;
    }
  }
}

export default ListByCategoryService;
