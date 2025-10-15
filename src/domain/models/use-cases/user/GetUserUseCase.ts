import { UserFinder } from "../../services/UserFinder";

export class GetUserUseCase {
  constructor(private userFinder: UserFinder) {}

  async execute(email: string): Promise<any> {
    const user = await this.userFinder.run(email);

    if (!user) {
      throw new Error('Email not registered');
    }

    return user;
  }
}