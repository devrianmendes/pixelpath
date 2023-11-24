import { Request, Response } from "express";
import ListProductByNameService from "../../services/product/ListProductByNameService";

class ListProductByNameController {
  async handle(req: Request, res: Response) {
    const { search } = req.body;

    const serviceInstance = new ListProductByNameService();

    try {
      const list = await serviceInstance.execute(search);

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

export default ListProductByNameController;
