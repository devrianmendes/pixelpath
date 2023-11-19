import prismaClient from "../../prisma";

interface UpdatePromotion {
  id: string,
  name: string,
  description: string,
  discountRate: number,
  startDate: Date,
  endDate: Date,
  user_id: string
}
class UpdatePromotionService {
  async execute({name, description, discountRate, startDate, endDate, id, user_id}: UpdatePromotion) {

    const updatePromotion = await prismaClient.promotion.update({
      where: {
        id: id
      },
      data: {
        
      }
    })
  }
}

export default UpdatePromotionService;