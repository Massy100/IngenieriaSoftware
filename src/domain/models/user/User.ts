import { UserId } from './value-objects/UserId';
import { UserEmail } from './value-objects/UserEmail';
import { UserDpi } from './value-objects/UserDpi';
import { UserName } from './value-objects/UserName';
import { UserAge } from './value-objects/UserAge';
import { UserIsValid } from './value-objects/UserIsValid';

export class User {
  constructor(
    private readonly id: UserId,
    private readonly email: UserEmail,
    private readonly dpi: UserDpi,
    private readonly name: UserName,
    private readonly age: UserAge,
    private readonly isValid: UserIsValid
  ) {}

  public getId(): string {
    return this.id.toString();
  }

  public getEmail(): string {
    return this.email.toString();
  }

  public getDpi(): string {
    return this.dpi.toString();
  }

  public getName(): string {
    return this.name.toString();
  }

  public getAge(): number {
    return this.age.toNumber();
  }

  public getIsValid(): boolean {
    return this.isValid.toBoolean();
  }

  public activate(): User {
    const newIsValid = UserIsValid.create(true);
    return new User(this.id, this.email, this.dpi, this.name, this.age, newIsValid);
  }

  public deactivate(): User {
    const newIsValid = UserIsValid.create(false);
    return new User(this.id, this.email, this.dpi, this.name, this.age, newIsValid);
  }

  public updateEmail(newEmail: string): User {
    const email = UserEmail.create(newEmail);
    return new User(this.id, email, this.dpi, this.name, this.age, this.isValid);
  }

  public equals(other: User): boolean {
    return this.id.toString() === other.getId();
  }

  public static create(params: {
    email: string;
    dpi: string;
    name: string;
    age: number;
    isValid: boolean;
  }): User {
    const id = UserId.create(User.generateId());
    const email = UserEmail.create(params.email);
    const dpi = UserDpi.create(params.dpi);
    const name = UserName.create(params.name);
    const age = UserAge.create(params.age);
    const isValid = UserIsValid.create(params.isValid);

    return new User(id, email, dpi, name, age, isValid);
  }

  private static generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}