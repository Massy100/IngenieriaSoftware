import { UserDto } from "../../user/UserDto";
import { UserDtoGenerator } from "../../user/UserDtoGenerator"; 
import { UserCreator } from "../../services/UserCreator";

export class CreateUserUseCase {
  constructor(private userCreator: UserCreator) {}

  async execute(userData: any): Promise<{ message: string }> {
    const userDto = new UserDto(
      userData.id, 
      userData.email,
      userData.dpi, 
      userData.name, 
      userData.age,
      false,
      userData.phone
    );

    const user = UserDtoGenerator.fromPrimitives(userDto);
    await this.userCreator.run(user);
    
    return { message: 'User created successfully' };
  }
}