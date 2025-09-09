export class UserDpi {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("DPI cannot be empty");
    }
  }

  public static create(value: string): UserDpi {
    return new UserDpi(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UserDpi): boolean {
    return this.value === other.toString();
  }
}