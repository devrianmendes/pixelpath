import prismaClient from "../../prisma";

interface CreateAddress {
  address: string,
  number: string,
  city: string,
  state: string,
  cep: number,
  costumerId: string
}

class CreateAddressService {
  async execute({address, number, city, state, cep, costumerId}: CreateAddress) {
    console.log(address, number, city, state, cep, costumerId, "service")
  
    const create = await prismaClient.address.create({
      data: {
        address: address,
        number: number,
        city: city,
        state: state,
        cep: cep,
        costumerId: costumerId
      }
    })
    return create;
  }
}

export default CreateAddressService;