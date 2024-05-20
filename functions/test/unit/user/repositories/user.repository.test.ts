import admin from "firebase-admin";
import { UserRepository } from '../../../../src/modules/user/repositories/user.repository';
import { User } from '../../../../src/modules/user/interfaces/user.interface';

jest.mock("firebase-admin", () => {
  return {
    firestore: jest.fn(() => ({
      collection: jest.fn().mockReturnThis(),
      add: jest.fn(),
    })),
  };
});

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let mockFirestore: any;

  beforeEach(() => {
    userRepository = new UserRepository();
    mockFirestore = (admin.firestore as unknown as jest.Mock).mock.results[0].value;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should add a user to the users collection", async () => {
      const user: User = {
        name: "John Doe",
      };

      await userRepository.create(user);

      expect(mockFirestore.collection).toHaveBeenCalledWith("users");
      expect(mockFirestore.add).toHaveBeenCalledWith(user);
    });
  });
});
