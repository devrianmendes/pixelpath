import prismaClient from "../../prisma";

interface UpdateProduct {
  id: string;
  name?: string;
  description?: string;
  costPrice?: number;
  sellPrice?: number;
  banner?: string;
  quantity?: number;
  discountRate?: number;
  published?: boolean;
  categoryId?: string;
  weight?: number;
  height?: number;
  width?: number;
  lenght?: number;
  manufacturer?: string;
}

class UpdateProductService {
  async execute({
    id,
    name,
    description,
    costPrice,
    sellPrice,
    banner,
    quantity,
    discountRate,
    published,
    categoryId,
    weight,
    height,
    width,
    lenght,
    manufacturer,
  }: UpdateProduct) {
    
    const updateProduct = await prismaClient.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        costPrice: costPrice,
        sellPrice: sellPrice,
        banner: banner,
        quantity: quantity,
        discountRate: discountRate,
        published: published,
        categoryId: categoryId,
      },
    });

    console.log(updateProduct)
    const updateDetails = await prismaClient.productDetails.update({
      where: {
        productId: id,
      }
      ,
      data: {
        weight: weight,
        height: height,
        width: width,
        length: lenght,
        manufacturer: manufacturer,
      }
    });

    return[updateProduct, updateDetails]
  }
}

export default UpdateProductService;
