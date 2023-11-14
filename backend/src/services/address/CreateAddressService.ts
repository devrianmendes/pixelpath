import prismaClient from "../../prisma";

interface CreateAddress {
  address: string,
  number: string,
  city: string,
  state: string,
  cep: string,
  costumerId: string
  isDefault: boolean
}

class CreateAddressService {
  async execute({address, number, city, state, cep, costumerId, isDefault}: CreateAddress) {
  
    const create = await prismaClient.address.create({
      data: {
        address: address,
        number: number,
        city: city,
        state: state,
        cep: cep,
        costumerId: costumerId,
        isDefault: isDefault
      }
    })
    return create;
  }
}

export default CreateAddressService;