import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CreateUser {
  name: string;
  surname: string;
  cpf: string;
  mobile: string;
  email: string;
  password: string;
  role: string;
}

class CreateUserService {
  async execute({
    name,
    surname,
    cpf,
    mobile,
    email,
    password,
    role,
  }: CreateUser) {
    let err = new CustomError();

    if (!name || !surname || !cpf || !mobile || !email || !password) {
      err.status = 401;
      err.message = "Preencha todos os dados.";
      throw err;
    }

    const emailAlreadyExist = await prismaClient.costumer.findFirst({
      where: {
        email: email,
      },
    });

    if (emailAlreadyExist) {
      err.status = 401;
      err.message = "Email já cadastrado.";
      throw err;
    }

    const passwordHash = await hash(password, 16);

    try {
      const user = await prismaClient.costumer.create({
        data: {
          name: name,
          surname: surname,
          cpf: cpf,
          mobile: mobile,
          email: email,
          password: passwordHash,
          role: role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      return user;
    } catch (err) {
      return err;
    }
  }
}

export default CreateUserService;
