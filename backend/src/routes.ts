import { Router } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";
import DetailUserController from "./controllers/user/DetailUserController";

import CreateCategoryController from "./controllers/category/CreateCategoryController";
import DeleteCategoryController from "./controllers/category/DeleteCategoryController";

import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

router.post("/createuser", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post("/createcategory", new CreateCategoryController().handle);
router.delete("/deletecategory", new DeleteCategoryController().handle);

export { router };
