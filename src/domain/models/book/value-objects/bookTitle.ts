export class BookTitle {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("BookTitle no puede ser vacío");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}