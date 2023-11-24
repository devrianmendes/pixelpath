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
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default ListByCategoryController;
