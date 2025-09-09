export class UserName {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    if (value.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }
  }

  public static create(value: string): UserName {
    return new UserName(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UserName): boolean {
    return this.value === other.toString();
  }
}