import { Request, Response } from "express";
import CreateAddressService from "../../services/address/CreateAddressService";

class CreateAddressController {
  async handle(req: Request, res: Response) {
    const { address, number, city, state, cep, costumerId, isDefault } =
      req.body;

    const createAddress = new CreateAddressService();
    try {
      const userAddress = await createAddress.execute({
        address,
        number,
        city,
        state,
        cep,
        costumerId,
        isDefault,
      });

      return res.json(userAddress);
    } catch (err) {
      if (err instanceof Error && err.message) {
        return res.status(500).end(err.message);
      } else {
        return res.status(500).end("Erro interno do servidor");
      }
    }
  }
}

export default CreateAddressController;
