export class UserId {
  private constructor(private readonly value: number) {}

  public static create(value: number): UserId {
    if (value === undefined || value === null) {
      throw new Error('User ID is required');
    }
    if (typeof value !== 'number') {
      throw new Error('User ID must be a number');
    }
    if (value <= 0) {
      throw new Error('User ID must be a positive number');
    }

    return new UserId(value);
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return this.value.toString();
  }

  public equals(other: UserId): boolean {
    return this.value === other.toNumber();
  }
}