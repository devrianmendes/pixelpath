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
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default CreatePromotionController;
