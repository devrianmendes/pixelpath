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
    let casedName: string | undefined;
    let casedDescription: string | undefined;
    let casedManufacturer: string | undefined;

    if (name) {
      casedName = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }
    if (description) {
      casedDescription = description
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }
    if (manufacturer) {
      casedManufacturer = manufacturer
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }

    try {
      const updateProduct = await prismaClient.product.update({
        where: {
          id: id,
        },
        data: {
          name: casedName,
          description: casedDescription,
          costPrice: costPrice,
          sellPrice: sellPrice,
          banner: banner,
          quantity: quantity,
          discountRate: discountRate,
          published: published,
          categoryId: categoryId,
        },
      });

      const updateDetails = await prismaClient.productDetails.update({
        where: {
          productId: id,
        },
        data: {
          productId: id,
          weight: weight,
          height: height,
          width: width,
          length: lenght,
          manufacturer: casedManufacturer,
        },
      });

      return [updateProduct, updateDetails];
    } catch (err) {
      return err;
    }
  }
}

export default UpdateProductService;
