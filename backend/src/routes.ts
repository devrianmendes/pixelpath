import { Router } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import DetailUserController from "./controllers/user/DetailUserController";

import CreateAddressController from "./controllers/address/CreateAddressController";

import CreateCategoryController from "./controllers/category/CreateCategoryController";
import DeleteCategoryController from "./controllers/category/DeleteCategoryController";

import CreateProductController from "./controllers/product/CreateProductController";

import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

router.post("/createuser", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post("/createaddress", new CreateAddressController().handle)
router.post("/createcategory", new CreateCategoryController().handle);
router.delete("/deletecategory", new DeleteCategoryController().handle);

router.post("/createproduct", new CreateProductController().handle)

export { router };
