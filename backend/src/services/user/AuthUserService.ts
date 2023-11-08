import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserInterface {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserInterface) {

    const user = await prismaClient.costumer.findFirst({ //VERIFICANDO SE O EMAIL INFORMADO EXISTE CADASTRADO NO BANCO DE DADOS
      where: {
        email: email,
      },
    });

    if (!user) { //CASO NÃO ESTEJA NO BANCO DE DADOS, IRÁ RETORNAR UM ERRO
      throw new Error("Usuário não existe.");
    }

    const passwordMatch = await compare(password, user.password); // CASO ESTEJA NO BANCO DE DADOS, IRÁ COMPARAR A SENHA INFORMADA COM A SENHA SALVA NO DB
    if (!passwordMatch) { //CASO A SENHA ESTEJA ERRADA, IRÁ RETORNAR UM ERRO
      throw new Error("Usuário ou senha incorretos.");
    }

    const token = sign( //CASO EMAIL E SENHA CORRETOS, CRIARÁ UM TOKEN DE AUTENTICAÇÃO COM AS INFORMAÇÕES DO USUÁRIO
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    };
  }
}

export default AuthUserService;
