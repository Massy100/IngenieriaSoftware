import { DtoGenerator } from './interfaces/DtoGenerator';
import { User } from './User';
import { UserDto } from './UserDto';

export class UserDtoGenerator implements DtoGenerator<User, UserDto> {
  
  public toPrimitives(user: User): UserDto {
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

  public fromPrimitives(primitives: UserDto): User {
    const UserId = require('./value-objects/UserId').UserId;
    const UserEmail = require('./value-objects/UserEmail').UserEmail;
    const UserDpi = require('./value-objects/UserDpi').UserDpi;
    const UserName = require('./value-objects/UserName').UserName;
    const UserAge = require('./value-objects/UserAge').UserAge;
    const UserIsValid = require('./value-objects/UserIsValid').UserIsValid;
    const UserPhone = require('./value-objects/UserPhone').UserPhone; 

    const id = new UserId(primitives.id);
    const email = new UserEmail(primitives.email);
    const dpi = new UserDpi(primitives.dpi);
    const name = new UserName(primitives.name);
    const age = new UserAge(primitives.age);
    const isValid = new UserIsValid(primitives.isValid);
    const phone = new UserPhone(primitives.phone); 

    return new User(id, email, dpi, name, age, isValid, phone);
  }

  public static toDto(user: User): UserDto {
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

  public static fromDto(dto: UserDto): User {
    const UserId = require('./value-objects/UserId').UserId;
    const UserEmail = require('./value-objects/UserEmail').UserEmail;
    const UserDpi = require('./value-objects/UserDpi').UserDpi;
    const UserName = require('./value-objects/UserName').UserName;
    const UserAge = require('./value-objects/UserAge').UserAge;
    const UserIsValid = require('./value-objects/UserIsValid').UserIsValid;
    const UserPhone = require('./value-objects/UserPhone').UserPhone; 
    const id = new UserId(dto.id);
    const email = new UserEmail(dto.email);
    const dpi = new UserDpi(dto.dpi);
    const name = new UserName(dto.name);
    const age = new UserAge(dto.age);
    const isValid = new UserIsValid(dto.isValid);
    const phone = new UserPhone(dto.phone); // Nuevo VO

    return new User(id, email, dpi, name, age, isValid, phone);
  }
}