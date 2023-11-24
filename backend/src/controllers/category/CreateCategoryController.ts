import { Request, Response } from "express";
import CreateCategoryService from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, parentName } = req.body;
    const user_id = req.user_id;

    try {
      const createCategoryService = new CreateCategoryService();
      const category = await createCategoryService.execute({
        name,
        parentName,
        user_id,
      });
      return res.json(category);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default CreateCategoryController;
