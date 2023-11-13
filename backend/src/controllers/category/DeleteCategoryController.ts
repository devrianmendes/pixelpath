import {Request, Response} from 'express';
import DeleteCategoryService from '../../services/category/DeleteCategoryService';

class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const name = req.body;

        const deleteCategory = new DeleteCategoryService();

        const delcat = deleteCategory.execute(name);

        return res.json(delcat)
    }
}

export default DeleteCategoryController;