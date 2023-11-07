import prismaClient from "../../prisma";
import {hash} from 'bcryptjs';

interface CreateUser {
  name: string
  surname: string
  cpf: string
  mobile: string
  email: string
  password: string
}

class CreateUserService {
  async execute({name, surname, cpf, mobile, email, password}: CreateUser) {
    
    if(!email) {
      throw new Error("Email não informado ou incorreto.")
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
        password: passwordHash
      },
      select: {
        id: true,
        name: true
      }
    })
    return user;
  }
}

export default CreateUserService;