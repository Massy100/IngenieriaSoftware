import { User } from './User';
import { UserDto } from './UserDto';

export class UserDtoGenerator {
  
  public static toPrimitives(user: User): UserDto {
    return new UserDto(
      user.getId(),
      user.getEmail(),
      user.getDpi(),
      user.getName(),
      user.getAge(),
      user.getIsValid(),
      user.getPhone() 
    );
  }

  public static fromPrimitives(primitives: UserDto): User {
    return User.create({
      email: primitives.email,
      dpi: primitives.dpi,
      name: primitives.name,
      age: primitives.age,
      isValid: primitives.isValid,
      phone: primitives.phone
    });
  }
}