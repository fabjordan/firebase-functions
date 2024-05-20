import { Request, Response, NextFunction } from 'express';
import { validateUser } from '../../../../src/modules/user/middlewares/user.validate';

describe('validateUser Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('UserValidateMiddleware', () => {
    it('should call next() if user data is valid', () => {
      req.body = { name: 'John Doe' };

      validateUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should return 400 if name is missing', () => {
      req.body = {};

      validateUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user data' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if name is not a string', () => {
      req.body = { name: 123 };

      validateUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user data' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if name is an empty string', () => {
      req.body = { name: ' ' };

      validateUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user data' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
