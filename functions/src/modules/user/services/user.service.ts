import { User } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(user: User): Promise<void> {
    await this.userRepository.create(user);
  }
}
