import { Request, Response } from "express";
import DetailUserService from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailUserService = new DetailUserService();

    try {
      const user = await detailUserService.execute(user_id);

      return res.json(user);
    } catch (err) {
      if (err.status) {
        return res.status(err.status).end(err.message);
      } else {
        return err;
      }
    }
  }
}

export default DetailUserController;
