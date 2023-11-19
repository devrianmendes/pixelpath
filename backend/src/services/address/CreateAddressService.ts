import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";

interface CreateAddress {
  address: string;
  number: string;
  city: string;
  state: string;
  cep: string;
  costumerId: string;
  isDefault: boolean;
}

class CreateAddressService {
  async execute({
    address,
    number,
    city,
    state,
    cep,
    costumerId,
    isDefault,
  }: CreateAddress) {
    let err = new CustomError();

    if (!address || !number || !city || !state || !cep) {
      err.status = 401;
      err.message = "Preencha todos os dados.";
      throw err;
    }

    try {
      const create = await prismaClient.address.create({
        data: {
          address: address
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase(),
          number: number
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase(),
          city: city
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase(),
          state: state
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase(),
          cep: cep,
          costumerId: costumerId,
          isDefault: isDefault,
        },
      });
      return create;
    } catch (err) {
      return err;
    }
  }
}

export default CreateAddressService;
