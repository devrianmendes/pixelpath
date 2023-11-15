import { Request, Response } from "express";
import CreatePaymentMethodService from "../../services/paymentMethod/CreatePaymentMethodService";

class CreatePaymentMethodController {
  async handle(req: Request, res: Response) {

    const {type} = req.body;

    const createMethod = new CreatePaymentMethodService();

    const method = await createMethod.execute(type);
    
    return res.json(method);
  }
}

export default CreatePaymentMethodController;