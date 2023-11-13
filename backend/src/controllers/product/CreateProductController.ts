import { Request, Response } from "express";
import CreateProductService from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const {
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

    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
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

    return res.json(product);
  }
}

export default CreateProductController;
