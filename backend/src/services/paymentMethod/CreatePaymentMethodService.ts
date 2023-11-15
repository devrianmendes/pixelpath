import prismaClient from "../../prisma";

class CreatePaymentMethodService {
  async execute(type: string){

    const exist = await prismaClient.paymentMethod.findFirst({
      where: {
        type: type
      }
    })

    if(exist) {
      console.log(exist)
      throw new Error("Método já existente.");
    }

    const createMethod = await prismaClient.paymentMethod.create({
      data: {
        type: type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
      }
    });
    return createMethod;
  }
}

export default CreatePaymentMethodService;