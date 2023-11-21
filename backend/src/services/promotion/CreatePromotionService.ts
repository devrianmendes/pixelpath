import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";

interface CreatePromotion {
  name: string;
  description: string;
  discountRate: number;
  startDate: string;
  endDate: string;
  user_id: string;
}

class CreatePromotionService {
  async execute({
    name,
    description,
    discountRate,
    startDate,
    endDate,
    user_id,
  }: CreatePromotion) {
    const casedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const casedDescription = description
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (!name || !description || !discountRate || !startDate || !endDate) {
      let err = new CustomError();
      err.status = 401;
      err.message = "Preencha todos os dados.";
      throw err;
    }
    try {
      const createPromotion = await prismaClient.promotion.create({
        data: {
          name: casedName,
          description: casedDescription,
          discountRate: discountRate,
          startDate: startDate,
          endDate: endDate,
          createdBy: user_id,
          updatedBy: user_id,
        },
      });
      return createPromotion;
    } catch (err) {
      return err;
    }
  }
}

export default CreatePromotionService;
