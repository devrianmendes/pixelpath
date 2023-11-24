import { Request, Response } from "express";
import DeleteCategoryService from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const name = req.body;
    const deleteCategory = new DeleteCategoryService();

    try {
      const delcat = deleteCategory.execute(name);

      return res.json(delcat);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default DeleteCategoryController;
