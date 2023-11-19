import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    try {
      const user = await prismaClient.costumer.findFirst({
        where: {
          id: user_id,
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

export default DetailUserService;
