export class BookId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("BookId no puede ser vacío");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}