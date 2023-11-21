import { Request, Response } from "express";
import DeletePromotionService from "../../services/promotion/DeletePromotionService";

class DeletePromotionController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;
    const deletePromotion = new DeletePromotionService();

    try {
      const deleted = deletePromotion.execute(id);
      return res.json(deleted);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default DeletePromotionController;
