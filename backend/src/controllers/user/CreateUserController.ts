import {Request, Response} from 'express';
import CreateUserService from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {

    const {name, surname, cpf, mobile, email, password} = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({name, surname, cpf, mobile, email, password});


    return res.json(user)
  }
}

export default CreateUserController