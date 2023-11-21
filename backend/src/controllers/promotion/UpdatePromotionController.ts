import { Request, Response } from "express";
import UpdatePromotionService from "../../services/promotion/UpdatePromotionService";

class UpdatePromotionController {
  async handle(req: Request, res: Response) {
    const { id, name, description, discountRate, startDate, endDate } =
      req.body;
    
      const user_id = req.user_id;

      console.log( id, name, description, discountRate, startDate, endDate, user_id )
    const updatePromotion = new UpdatePromotionService();
    try {
      const updated = await updatePromotion.execute({
        id,
        name,
        description,
        discountRate,
        startDate,
        endDate,
        user_id,
      });
      return res.json(updated);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default UpdatePromotionController;
