export class UserId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("User ID cannot be empty");
    }
  }

  public static create(value: string): UserId {
    return new UserId(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.toString();
  }
}