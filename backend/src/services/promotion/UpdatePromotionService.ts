import prismaClient from "../../prisma";

interface UpdatePromotion {
  id: string;
  name?: string;
  description?: string;
  discountRate?: number;
  startDate?: Date;
  endDate?: Date;
  user_id: string;
}
class UpdatePromotionService {
  async execute({
    name,
    description,
    discountRate,
    startDate,
    endDate,
    id,
    user_id,
  }: UpdatePromotion) {
    try {
      let casedName = "";
      let casedDescription = "";

      name
        ? (casedName = name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase())
        : null;
      description
        ? (casedDescription = description
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase())
        : null;

      const updatePromotion = await prismaClient.promotion.update({
        where: {
          id: id,
        },
        data: {
          name: casedName,
          description: casedDescription,
          discountRate: discountRate,
          startDate: startDate,
          endDate: endDate,
          updatedBy: user_id,
        },
      });
      return updatePromotion;
    } catch (err) {
      return err;
    }
  }
}

export default UpdatePromotionService;
