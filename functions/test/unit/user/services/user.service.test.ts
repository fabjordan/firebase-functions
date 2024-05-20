import { UserService } from '../../../../src/modules/user/services/user.service';
import { UserRepository } from '../../../../src/modules/user/repositories/user.repository';
import { User } from '../../../../src/modules/user/interfaces/user.interface';

jest.mock('../../../../src/modules/user/repositories/user.repository');

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should call create method of userRepository with the correct user", async () => {
      const user: User = {
        name: "John Doe",
      };

      await userService.create(user);

      expect(userRepository.create).toHaveBeenCalledWith(user);
    });
  });
});
