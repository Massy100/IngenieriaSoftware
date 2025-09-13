export class UserIsValid {
  constructor(private readonly value: boolean) {}

  public static create(value: boolean): UserIsValid {
    return new UserIsValid(value);
  }

  public toBoolean(): boolean {
    return this.value;
  }

  public equals(other: UserIsValid): boolean {
    return this.value === other.toBoolean();
  }
}