import { Request, Response } from "express";
import ListByCategoryService from "../../services/category/ListByCategoryService";

class ListByCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const listByCategory = new ListByCategoryService();

    try {
      const list = await listByCategory.execute(name);

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

export default ListByCategoryController;
