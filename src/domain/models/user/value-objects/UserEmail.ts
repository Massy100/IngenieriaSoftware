export class UserEmail {
  constructor(private readonly value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error("Invalid email format");
    }
  }

  public static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  public toString(): string {
    return this.value;
  }

  private isValidEmail(email: string): boolean {
    if (!email) {
        return false;
    }
    const arrobaIndex = email.indexOf('@');
    const puntoIndex = email.lastIndexOf('.');

    if (
        arrobaIndex < 1 || 
        puntoIndex === -1 || 
        puntoIndex === email.length - 1 || 
        puntoIndex < arrobaIndex + 2 
    ) {
        return false;
    }
    return true;
  }
  

  public equals(other: UserEmail): boolean {
    return this.value === other.toString();
  }
}