import admin from "firebase-admin";
import { User } from "../interfaces/user.interface";

export class UserRepository {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async create(user: User): Promise<void> {
    await this.db.collection("users").add(user);
  }
}
