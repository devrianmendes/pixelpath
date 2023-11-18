import prismaClient from "../../prisma";

interface PaymentData {
  provider: string;
  number: string;
  expireDate: Date;
  isDefault: boolean;
  costumerId: string;
  paymentMethodType: string;
}

class CreatePaymentDataService {
  async execute({
    provider,
    number,
    expireDate,
    isDefault,
    costumerId,
    paymentMethodType,
  }: PaymentData) {
    const createPayData = await prismaClient.paymentData.create({
      data: {
        provider: provider,
        number: number,
        expireDate: expireDate,
        isDefault: isDefault,
        costumerId: costumerId,
        paymentMethodType: paymentMethodType,
        createdBy: costumerId
      },
    });
    // console.log(provider,
    //     number,
    //     expireDate,
    //     isDefault,
    //     costumerId,
    //     paymentMethodType)
    return createPayData;
  }
}

export default CreatePaymentDataService;
