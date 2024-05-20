import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../interfaces/user.interface";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const user: User = { name };
      
      await this.userService.create(user);
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
