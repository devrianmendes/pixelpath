import { Request, Response } from "express";
import CreatePaymentDataService from "../../services/paymentData/CreatePaymentDataService";

class CreatePaymentDataController {
  async handle(req: Request, res: Response) {
    const {
      provider,
      number,
      expireDate,
      isDefault,
      costumerId,
      paymentMethodType,
    } = req.body;;
    const paymentData = new CreatePaymentDataService();
    const data = await paymentData.execute({
      provider,
      number,
      expireDate,
      isDefault,
      costumerId,
      paymentMethodType,
    });
    return res.json(data);
  }
}

export default CreatePaymentDataController;
