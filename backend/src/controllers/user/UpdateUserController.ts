import { Request, Response } from "express";
import UpdateUserService from "../../services/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {

    const {mobile, password} = req.body;

    const user_id = req.user_id;

    const updateUser = new UpdateUserService;

    const update = await updateUser.execute({user_id, mobile, password})

    return res.json(update)
  }
}

export default UpdateUserController;