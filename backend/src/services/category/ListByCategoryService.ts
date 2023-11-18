import prismaClient from "../../prisma";  

class ListByCategoryService {
  async execute(name: string) {
    const id = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    });
    
    const list = await prismaClient.product.findMany({
      where: {
        categoryId: id.id
      },
      include: {
        productDetails: true
      }
    });
    
    return list;
  }
}

export default ListByCategoryService;