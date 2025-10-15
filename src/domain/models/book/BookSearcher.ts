import { Book } from "./book";
import { BookRepository } from "./interfaces/BookRepository";
import { UserFinder } from "../services/UserFinder";

export class BookSearcher {
  constructor(
    private readonly repository: BookRepository,
    private readonly userFinder: UserFinder
  ) {}

  async run(email: string): Promise<Book[]> {
    const user = await this.userFinder.run(email);

    if (!user) {
      throw new Error("User not found");
    }

    const books = await this.repository.find();
    return books;
  }

  async runAndConvertToPrimitives(email: string): Promise<any[]> {
    const books = await this.run(email);
    return books.map(book => book.toPrimitives());
  }
}