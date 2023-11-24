import prismaClient from "../../prisma";

class ListCategoryPromotionService {
  async execute(categoryId: string) {
    try {
      const listCategoryPromotion =
        await prismaClient.categoryPromotion.findMany({
          where: {
            categoryId: categoryId,
          },
        });
      return listCategoryPromotion;
    } catch (err) {
      return err;
    }
  }
}

export default ListCategoryPromotionService;