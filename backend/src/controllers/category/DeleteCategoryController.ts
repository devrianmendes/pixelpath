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
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default DeleteCategoryController;
