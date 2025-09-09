export class UserPhone {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Phone number cannot be empty");
    }
    if (!this.isValidPhone(value)) {
      throw new Error("Invalid phone number format");
    }
  }

  public static create(value: string): UserPhone {
    return new UserPhone(value);
  }

  public toString(): string {
    return this.value;
  }

  private isValidPhone(phone: string): boolean {
    const regex = /^\d{8}$/; 
    return regex.test(phone);
  }

  public equals(other: UserPhone): boolean {
    return this.value === other.toString();
  }
}