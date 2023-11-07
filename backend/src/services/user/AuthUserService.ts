import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserInterface {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserInterface) {
    const user = await prismaClient.costumer.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuário não existe.");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorretos.");
    }

    const token = sign(
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
