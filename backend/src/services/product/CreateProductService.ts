import prismaClient from "../../prisma";

interface CreateProduct {
    name: string,
    description: string,
    costPrice: number,
    sellPrice: number,
    banner: string,
    quantity: number,
    discountRate: number,
    published: boolean,
    categoryId: string
}

class CreateProductService {
    async execute({name, description, costPrice, sellPrice, banner, quantity, discountRate, published, categoryId}: CreateProduct) {
        if(!name || !description || !costPrice || !sellPrice || !banner || !quantity || !published || !categoryId) {
            return new Error("Preencha todos os dado necessários.")
        }
    }
}

export default CreateProductService;