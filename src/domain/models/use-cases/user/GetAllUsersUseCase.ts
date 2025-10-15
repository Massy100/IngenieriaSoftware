import SupabaseUserRepository from "@/domain/models/repositories/SupabaseUserRepository";

export class GetAllUsersUseCase {
  private userRepository = new SupabaseUserRepository();

  async execute(): Promise<any[]> {
    return await this.userRepository.getAll();
  }
}