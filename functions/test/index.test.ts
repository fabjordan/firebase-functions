import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { webApi } from '../src/index';
import { routes } from '../src/routes';

describe('Express App Configuration', () => {
  it('should create an Express app', () => {
    const app = express();
    app.use(cors({ origin: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    routes(app);

    expect(app).toBeDefined();
    expect(typeof app).toBe('function');
  });
});

describe('Express App Routes', () => {
  it('should add routes to Express app', () => {
    const app = express();
    routes(app);

    expect(app._router.stack.length).toBeGreaterThan(0);
  });
});

describe('Firebase Functions', () => {
  it('should export webApi function', () => {
    expect(typeof webApi).toBe('function');
  });
});
