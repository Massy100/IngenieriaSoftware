import { CreateUserUseCase } from "../use-cases/user/CreateUserUseCase";
import { GetUserUseCase } from "../use-cases/user/GetUserUseCase";
import { GetAllUsersUseCase } from "../use-cases/user/GetAllUsersUseCase";

export class UserManagementOrchestrator {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase
  ) {}

  async createUser(userData: any) {
    return await this.createUserUseCase.execute(userData);
  }

  async getUserByEmail(email: string) {
    return await this.getUserUseCase.execute(email);
  }

  async getAllUsers() {
    return await this.getAllUsersUseCase.execute();
  }
}