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
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default ListCategoryPromotionController;
