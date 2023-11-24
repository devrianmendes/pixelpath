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
      manufacturer,
    } = req.body;

    const user_id = req.user_id;

    const createProductService = new CreateProductService();
    try {
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
        manufacturer,
        user_id,
      });

      return res.json(product);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default CreateProductController;
