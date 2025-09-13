export class BookAuthor {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("BookAuthor no puede ser vacío");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}