import { Request, Response } from "express";
import CreatePromotionService from "../../services/promotion/CreatePromotionService";

class CreatePromotionController {
  async handle(req: Request, res: Response) {
    const { name, description, discountRate, startDate, endDate } = req.body;
    const user_id = req.user_id;
    const createPromotion = new CreatePromotionService();

    try {
      const promotion = await createPromotion.execute({
        name,
        description,
        discountRate,
        startDate,
        endDate,
        user_id,
      });
      return res.json(promotion);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default CreatePromotionController;
