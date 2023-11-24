import { Request, Response } from "express";
import ListCategoryPromotionService from "../../services/categoryPromotion/ListCategoryPromotionService";

class ListCategoryPromotionController {
  async handle(req: Request, res: Response) {
    const { categoryId } = req.body;

    const listCategoryPromotion = new ListCategoryPromotionService();
    try {
      const list = listCategoryPromotion.execute(categoryId);
      return res.json(list);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default ListCategoryPromotionController;
