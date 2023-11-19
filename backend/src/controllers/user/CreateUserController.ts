import { Request, Response } from "express";
import CreateUserService from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, surname, cpf, mobile, email, password, role } = req.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        surname,
        cpf,
        mobile,
        email,
        password,
        role,
      });

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

export default CreateUserController;
