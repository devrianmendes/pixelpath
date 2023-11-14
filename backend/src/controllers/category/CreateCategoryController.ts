import {Request, Response} from 'express';
import CreateCategoryService from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const {name, parentName} = req.body;
        const user_id = req.user_id;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({name, parentName, user_id})

        return res.json(category)

    }
}

export default CreateCategoryController;