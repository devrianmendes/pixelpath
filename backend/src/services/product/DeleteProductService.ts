import prismaClient from "../../prisma";

class DeleteProductService {
  async execute(id: string) {
    const delDetails = await prismaClient.productDetails.delete({
      where: {
        productId: id,
      },
    });

    const deleteProduct = await prismaClient.product.delete({
      where: {
        id: id,
      },
    });
    return deleteProduct;
  }
}

export default DeleteProductService;
