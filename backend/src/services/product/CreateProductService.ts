import CustomError from "../../error/CustomError";
import prismaClient from "../../prisma";

interface CreateProduct {
  name: string;
  description: string;
  costPrice: number;
  sellPrice: number;
  banner: string;
  quantity: number;
  discountRate: number;
  published: boolean;
  categoryId: string;
  weight: number;
  height: number;
  width: number;
  lenght: number;
  manufacturer: string;
  user_id: string;
}

class CreateProductService {
  async execute({
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
    user_id,
  }: CreateProduct) {
    let err = new CustomError();

    try {
      if (
        !name ||
        !description ||
        !costPrice ||
        !sellPrice ||
        !banner ||
        !quantity ||
        !published ||
        !categoryId ||
        !weight ||
        !height ||
        !width ||
        !lenght ||
        !manufacturer
      ) {
        err.status = 401;
        err.message = "Preencha todos os dado.";
        throw err;
      } else {
        const createProduct = await prismaClient.product.create({
          data: {
            name: name
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
            description: description
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
            costPrice: costPrice,
            sellPrice: sellPrice,
            banner: banner,
            quantity: quantity,
            discountRate: discountRate,
            published: published,
            categoryId: categoryId,
            createdBy: user_id,
            updatedBy: user_id,
          },
        });

        const createProductDetails = await prismaClient.productDetails.create({
          data: {
            weight: weight,
            height: height,
            width: width,
            length: lenght,
            manufacturer: manufacturer
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
            productId: createProduct.id,
          },
        });
        return [createProduct, createProductDetails];
      }
    } catch (err) {
      return err;
    }
  }
}

export default CreateProductService;
