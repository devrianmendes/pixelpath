import prismaClient from "../../prisma"; 

class ListProductByNameService {
  async execute(search: string) {
    
    const searchCase = search.toLowerCase()
  
    const getList = await prismaClient.product.findMany({
      where: {
        name: { contains: searchCase.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() }
      },
      include: {
        productDetails: true
      }
    });
    console.log(getList)
    return getList;
  }
}

export default ListProductByNameService;