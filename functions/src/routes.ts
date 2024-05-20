import { Router } from 'express';
import { userRoutes } from './modules/user/user.route';

export function routes(app: Router) {
    userRoutes(app);
}