import prismaClient from "../../prisma";

interface IncludeItems {
  total: number;
  productId: string;
  orderId?: string;
  costumerId: string;
  user_id: string;
}

class IncludeItemsCartService {
  async execute({ total, productId, orderId, costumerId, user_id }: IncludeItems) {
    const getCart = await prismaClient.cart.findFirst({
      where: {
        costumerId: user_id
      }
    });

    const updateCart = await prismaClient.cart.update({
      where: {
        id: getCart.id
      },
      data: {
        total: total,
        productId: productId,
        orderId: orderId,
      }
    })
  }
}

export default IncludeItemsCartService;
