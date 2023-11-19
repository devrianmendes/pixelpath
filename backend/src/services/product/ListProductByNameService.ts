import prismaClient from "../../prisma";

class ListProductByNameService {
  async execute(search: string) {

    const searchCase = search
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    try {
      const getList = await prismaClient.product.findMany({
        where: {
          name: { contains: searchCase },
        },
        include: {
          productDetails: true,
        },
      });
      return getList;
    } catch (err) {
      return err;
    }
  }
}

export default ListProductByNameService;
