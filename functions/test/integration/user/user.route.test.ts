import request from 'supertest';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from '../../../src/modules/user/user.route';

jest.mock('../../../src/modules/user/services/user.service');
jest.mock('../../../src/modules/user/repositories/user.repository');

describe('User Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    const router = Router();
    router.use(bodyParser.json());
    userRoutes(router);
    app.use(router);
  });

  it('should create a new user', async () => {
    const userData = { name: 'John Doe' };

    const response = await request(app)
      .post('/user/create')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User created successfully' });
  });

  it('should return 400 if invalid user data is provided', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid user data' });
  });
});
