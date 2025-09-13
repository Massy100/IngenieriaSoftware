import { UserId } from './value-objects/UserId';
import { UserEmail } from './value-objects/UserEmail';
import { UserDpi } from './value-objects/UserDpi';
import { UserName } from './value-objects/UserName';
import { UserAge } from './value-objects/UserAge';
import { UserIsValid } from './value-objects/UserIsValid';
import { UserPhone } from './value-objects/UserPhone'; 

export class User {
  constructor(
    private readonly id: UserId,
    private readonly email: UserEmail,
    private readonly dpi: UserDpi,
    private readonly name: UserName,
    private readonly age: UserAge,
    private readonly isValid: UserIsValid,
    private readonly phone: UserPhone 
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

  public getPhone(): string { 
    return this.phone.toString();
  }

  public activate(): User {
    const newIsValid = UserIsValid.create(true);
    return new User(this.id, this.email, this.dpi, this.name, this.age, newIsValid, this.phone);
  }

  public deactivate(): User {
    const newIsValid = UserIsValid.create(false);
    return new User(this.id, this.email, this.dpi, this.name, this.age, newIsValid, this.phone);
  }

  public updateEmail(newEmail: string): User {
    const email = UserEmail.create(newEmail);
    return new User(this.id, email, this.dpi, this.name, this.age, this.isValid, this.phone);
  }

  public updatePhone(newPhone: string): User { 
    const phone = UserPhone.create(newPhone);
    return new User(this.id, this.email, this.dpi, this.name, this.age, this.isValid, phone);
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
    phone: string; 
  }): User {
    const id = UserId.create(User.generateId());
    const email = UserEmail.create(params.email);
    const dpi = UserDpi.create(params.dpi);
    const name = UserName.create(params.name);
    const age = UserAge.create(params.age);
    const isValid = UserIsValid.create(params.isValid);
    const phone = UserPhone.create(params.phone); 

    return new User(id, email, dpi, name, age, isValid, phone);
  }

  private static generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}