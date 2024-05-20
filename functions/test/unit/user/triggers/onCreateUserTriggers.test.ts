import functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import { onCreateUserTrigger } from '../../../../src/modules/user/triggers/onCreateUserTriggers';

const testEnv = functions();

jest.mock('firebase-admin', () => {
  const firestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    runTransaction: jest.fn(),
  };

  return {
    firestore: jest.fn(() => firestore),
  };
});

describe('onCreateUserTrigger', () => {
  let firestore: any;
  let wrapped: any;

  beforeEach(() => {
    firestore = admin.firestore();
    wrapped = testEnv.wrap(onCreateUserTrigger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the user document with an incremented ID', async () => {
    const userId = 'testUserId';

    // Simulando retorno do Firestore counter document
    firestore.runTransaction.mockImplementation(async (updateFunction: any) => {
      const fakeTransaction = {
        get: jest.fn().mockResolvedValueOnce({ exists: true, data: () => ({ count: 1 }) }),
        update: jest.fn(),
        set: jest.fn(),
      };
      await updateFunction(fakeTransaction);
      const incrementId = 2;
      return incrementId;
    });

    const snapshot = {
      ref: {
        update: jest.fn(),
      },
    };

    const context = {
      params: {
        userId,
      },
    };

    await wrapped(snapshot, context);

    expect(firestore.collection).toHaveBeenCalledWith('counters');
    expect(firestore.doc).toHaveBeenCalledWith('users');
    expect(snapshot.ref.update).toHaveBeenCalledWith({ increment_id: 2 });
  });

  it('should set the counter document if it does not exist', async () => {
    firestore.runTransaction.mockImplementation(async (updateFunction: any) => {
      const fakeTransaction = {
        get: jest.fn().mockResolvedValueOnce({ exists: false }),
        update: jest.fn(),
        set: jest.fn(),
      };
      await updateFunction(fakeTransaction);
    });

    const snapshot = {
      ref: {
        update: jest.fn(),
      },
    };

    const context = {
      params: {
        userId: 'testUserId',
      },
    };

    await wrapped(snapshot, context);

    expect(firestore.collection).toHaveBeenCalledWith('counters');
    expect(firestore.doc).toHaveBeenCalledWith('users');
    expect(firestore.runTransaction).toHaveBeenCalled();
  });
});
