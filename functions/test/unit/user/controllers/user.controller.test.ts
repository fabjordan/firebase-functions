import { UserController } from '../../../../src/modules/user/controllers/user.controller';
import { UserService } from '../../../../src/modules/user/services/user.service';


jest.mock('../../../../src/modules/user/services/user.service', () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
      create: jest.fn(),
    })),
  };
});

describe('UserController', () => {
  let userService: jest.Mocked<UserService>;
  let userController: UserController;
  let req: any;
  let res: any;

  beforeEach(() => {
    userService = {
      create: jest.fn(),
    } as unknown as jest.Mocked<UserService>;
    userController = new UserController(userService);
    req = {
      headers: {},
      body: {},
      params: {},
      query: {},
      user: {},
      logger: {
        info: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
      },
    };
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };
  });

  describe('createUser', () => {
    it('should create a user and return status 201 with success message', async () => {
      req.body = { name: 'Superfrete' };

      await userController.createUser(req, res);

      expect(userService.create).toHaveBeenCalledWith({ name: 'Superfrete' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    it('should return status 500 with error message on service failure', async () => {
      req.body = { name: 'Superfrete' };
      userService.create.mockRejectedValue(new Error('Service error'));

      await userController.createUser(req, res);

      expect(userService.create).toHaveBeenCalledWith({ name: 'Superfrete' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
