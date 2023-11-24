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
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default DetailUserController;
