export class UserAge {
  constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }
    if (value > 150) {
      throw new Error("Age cannot be greater than 150");
    }
  }

  public static create(value: number): UserAge {
    return new UserAge(value);
  }

  public toNumber(): number {
    return this.value;
  }

  public equals(other: UserAge): boolean {
    return this.value === other.toNumber();
  }
}