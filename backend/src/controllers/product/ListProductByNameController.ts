import { Request, Response } from "express";
import ListProductByNameService from "../../services/product/ListProductByNameService";

class ListProductByNameController {
  async handle(req: Request, res: Response) {
    const {search} = req.body;
    
    const serviceInstance = new ListProductByNameService();

    const list = await serviceInstance.execute(search);

    return res.json(list);
  }
}

export default ListProductByNameController;