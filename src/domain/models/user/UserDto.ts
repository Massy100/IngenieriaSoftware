export class UserDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly dpi: string,
    public readonly name: string,
    public readonly age: number,
    public readonly isValid: boolean,
    public readonly phone: string 
  ) {}

  public toJSON(): string {
    return JSON.stringify({
      id: this.id,
      email: this.email,
      dpi: this.dpi,
      name: this.name,
      age: this.age,
      isValid: this.isValid,
      phone: this.phone 
    });
  }
}