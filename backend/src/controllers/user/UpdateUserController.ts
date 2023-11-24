import { Request, Response } from "express";
import UpdateUserService from "../../services/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { mobile, password } = req.body;

    const user_id = req.user_id;

    const updateUser = new UpdateUserService();

    try {
      const update = await updateUser.execute({ user_id, mobile, password });

      return res.json(update);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default UpdateUserController;
