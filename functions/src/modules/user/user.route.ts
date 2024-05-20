import { Router } from 'express';
import { UserController } from './controllers/user.controller'
import { UserRepository } from './repositories/user.repository';
import { UserService} from './services/user.service';
import { validateUser } from './middlewares/user.validate';

const userRepository = new UserRepository();
const createUserUseCase = new UserService(userRepository);
const userController = new UserController(createUserUseCase);

export function userRoutes(app: Router) {
    app.post('/user/create', validateUser, (req, res) => userController.createUser(req, res));
}
