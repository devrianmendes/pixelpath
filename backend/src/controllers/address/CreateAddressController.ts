import { Request, Response } from "express";
import CreateAddressService from "../../services/address/CreateAddressService";

class CreateAddressController {
  async handle(req: Request, res: Response) {
    const {address, number, city, state, cep, costumerId, isDefault} = req.body;
    console.log(address, number, city, state, cep, costumerId);

    const createAddress = new CreateAddressService;
    const userAddress = await createAddress.execute({address, number, city, state, cep, costumerId, isDefault})

    return res.json(userAddress);
  }
}

export default CreateAddressController