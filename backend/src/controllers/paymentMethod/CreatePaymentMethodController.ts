import { Request, Response } from "express";
import CreatePaymentMethodService from "../../services/paymentMethod/CreatePaymentMethodService";

class CreatePaymentMethodController {
  async handle(req: Request, res: Response) {
    const { type } = req.body;

    const createMethod = new CreatePaymentMethodService();

    try {
      const method = await createMethod.execute(type);

      return res.json(method);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default CreatePaymentMethodController;
