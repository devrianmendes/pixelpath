import { Request, Response } from "express";
import UpdateProductService from "../../services/product/UpdateProductService";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const {
      id,
      name,
      description,
      costPrice,
      sellPrice,
      banner,
      quantity,
      discountRate,
      published,
      categoryId,
      weight,
      height,
      width,
      lenght,
      manufacturer
    } = req.body;

    const updateProduct = new UpdateProductService();
    
    const product = await updateProduct.execute({
      id,
      name,
      description,
      costPrice,
      sellPrice,
      banner,
      quantity,
      discountRate,
      published,
      categoryId,
      weight,
      height,
      width,
      lenght,
      manufacturer
    });

    return res.json(product)
  }
}

export default UpdateProductController;