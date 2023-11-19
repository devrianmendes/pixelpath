import prismaClient from "../../prisma";

class DeleteProductService {
  async execute(id: string) {
    try {
      const delDetails = await prismaClient.productDetails.delete({
        where: {
          productId: id,
        },
      });

      console.log(delDetails);
      const deleteProduct = await prismaClient.product.delete({
        where: {
          id: id,
        },
      });
      return deleteProduct;
    } catch (err) {
      return err;
    }
  }
}

export default DeleteProductService;
