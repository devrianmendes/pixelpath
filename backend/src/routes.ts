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

const router = Router();

router.post("/createuser", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/updateuser", isAuthenticated, new UpdateUserController().handle)

router.post("/createaddress", isAuthenticated, new CreateAddressController().handle)
router.post("/createcategory", isAuthenticated, isAdmin, new CreateCategoryController().handle);
router.delete("/deletecategory", isAuthenticated, isAdmin, new DeleteCategoryController().handle);

router.post("/createproduct", isAuthenticated, isAdmin, new CreateProductController().handle)

export { router };
