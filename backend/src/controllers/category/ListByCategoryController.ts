import { Request, Response } from "express";
import ListByCategoryService from "../../services/category/ListByCategoryService";

class ListByCategoryController {
  async handle(req: Request, res: Response) {
    const {name} = req.body;

    // console.log(name)
    const listByCategory = new ListByCategoryService();

    const list = await listByCategory.execute(name);

    return res.json(list);
  }
}

export default ListByCategoryController;