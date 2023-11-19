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
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default ListProductByNameController;
