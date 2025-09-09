export class UserDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly dpi: string,
    public readonly name: string,
    public readonly age: number,
    public readonly isValid: boolean
  ) {}

  public toJSON(): string {
    return JSON.stringify({
      id: this.id,
      email: this.email,
      dpi: this.dpi,
      name: this.name,
      age: this.age,
      isValid: this.isValid
    });
  }

  public static fromObject(obj: {
    id: string;
    email: string;
    dpi: string;
    name: string;
    age: number;
    isValid: boolean;
  }): UserDto {
    return new UserDto(obj.id, obj.email, obj.dpi, obj.name, obj.age, obj.isValid);
  }
}