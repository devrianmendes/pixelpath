import { Request, Response } from "express";
import DeleteProductService from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const delProduct = new DeleteProductService();

    try {
      const del = await delProduct.execute(id);
  
      return res.json(del);
      
    } catch (err) {
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default DeleteProductController;
