import { Router } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import DetailUserController from "./controllers/user/DetailUserController";
import UpdateUserController from "./controllers/user/UpdateUserController";

import CreateAddressController from "./controllers/address/CreateAddressController";

import CreateCategoryController from "./controllers/category/CreateCategoryController";
import DeleteCategoryController from "./controllers/category/DeleteCategoryController";

import CreateProductController from "./controllers/product/CreateProductController";

import isAuthenticated from "./middlewares/isAuthenticated";
import isAdmin from "./middlewares/isAdmin";
import UpdateProductController from "./controllers/product/UpdateProductController";
import CreatePaymentMethodController from "./controllers/paymentMethod/CreatePaymentMethodController";
import DeleteProductController from "./controllers/product/DeleteProductController";
import ListByCategoryController from "./controllers/category/ListByCategoryController";
import ListProductByNameController from "./controllers/product/ListProductByNameController";
import CreatePromotionController from "./controllers/promotion/CreatePromotionController";
// import CreatePaymentDataController from "./controllers/paymentData/CreatePaymentDataController";

const router = Router();

router.post("/createuser", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/updateuser", isAuthenticated, new UpdateUserController().handle);

router.post("/createaddress", isAuthenticated, new CreateAddressController().handle);

router.post("/createcategory", isAuthenticated, isAdmin, new CreateCategoryController().handle);
router.delete("/deletecategory", isAuthenticated, isAdmin, new DeleteCategoryController().handle);
router.get("/listcategory", new ListByCategoryController().handle);

router.post("/createproduct", isAuthenticated, isAdmin, new CreateProductController().handle);
router.put("/updateproduct", isAuthenticated, isAdmin, new UpdateProductController().handle);
router.delete("/deleteproduct", isAuthenticated, isAdmin, new DeleteProductController().handle);
router.get("/listproduct", new ListProductByNameController().handle)

router.post("/createmethod", isAuthenticated, isAdmin, new CreatePaymentMethodController().handle);
// router.post("/createdata", isAuthenticated, new CreatePaymentDataController().handle)

router.post("/createpromotion", isAuthenticated, isAdmin, new CreatePromotionController().handle);
export { router };
