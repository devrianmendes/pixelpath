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
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default DeletePromotionController;
