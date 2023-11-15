import { Request, Response } from "express";
import DeleteProductService from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const delProduct = new DeleteProductService();

    const del = delProduct.execute(id);

    return res.json(del);
  }
}

export default DeleteProductController;
