import {Router, Request, Response} from 'express';
import CreateUserController from './controllers/user/CreateUserController';
import AuthUserController from './controllers/user/AuthUserController';

const router = Router();

router.post('/createuser', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

export {router};