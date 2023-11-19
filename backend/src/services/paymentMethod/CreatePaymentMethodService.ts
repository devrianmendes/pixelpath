import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";

class CreatePaymentMethodService {
  async execute(type: string) {
    let err = new CustomError();
    const casedType = type
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    try {
      const exist = await prismaClient.paymentMethod.findFirst({
        where: {
          type: type,
        },
      });

      if (exist) {
        err.status = 404;
        err.message = "Este método de pagamento já existe.";
        throw err;
      }

      const createMethod = await prismaClient.paymentMethod.create({
        data: {
          type: casedType,
        },
      });
      return createMethod;
    } catch (error) {
      return err;
    }
  }
}

export default CreatePaymentMethodService;
