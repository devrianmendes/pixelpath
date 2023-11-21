import prismaClient from "../../prisma";

class DeletePromotionService {
  async execute(id: string) {
    try {
      const deletePromotion = await prismaClient.promotion.delete({
        where: {
          id: id,
        },
      });
      return deletePromotion;
    } catch (err) {
      return err;
    }
  }
}

export default DeletePromotionService;
