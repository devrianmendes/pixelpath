import prismaClient from "../../prisma";
import {hash} from 'bcryptjs';

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
  async execute({name, surname, cpf, mobile, email, password, role}: CreateUser) {
    
    if(!name || !surname || !cpf || !mobile || !email || !password ) {
      throw new Error("Dados faltantes.")
    }

    const emailAlreadyExist = await prismaClient.costumer.findFirst({
      where: {
        email: email
      }
    })

    if(emailAlreadyExist) {
      throw new Error("Email já cadastrado.")
    }

    const passwordHash = await hash(password, 16)

    const user = await prismaClient.costumer.create({
      data: {
        name: name,
        surname: surname,
        cpf: cpf,
        mobile: mobile,
        email: email,
        password: passwordHash,
        role: role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })
    return user;
  }
}

export default CreateUserService;