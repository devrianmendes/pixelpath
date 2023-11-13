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
  }: CreateProduct) {
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
      throw new Error("Preencha todos os dado necessários.");
    } else {
      //   console.log(
      //     "name:", name,
      //     "description", description,
      //     "costPrice", costPrice,
      //     "sellPrice", sellPrice,
      //     "banner", banner,
      //     "quantity", quantity,
      //     "discountRate", discountRate,
      //     "published", published,
      //     "categoryId", typeof(categoryId)
      //   )
      const createProduct = await prismaClient.product.create({
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

      const createProductDetails = await prismaClient.productDetails.create({
        data: {
          weight: weight,
          height: height,
          width: width,
          length: lenght,
          manufacturer: manufacturer,
          productId: createProduct.id
        }
      })
      return [createProduct, createProductDetails];
    }
  }
}

export default CreateProductService;
