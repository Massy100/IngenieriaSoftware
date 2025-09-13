import { Book } from "./book";
import { BookRepository } from "./interfaces/BookRepository";
import { UserFinder } from "../user/"; //No encontre el UserFinder, creo que no existe jaja

export class BookSearcher {
  constructor(
    private readonly repository: BookRepository,
    private readonly userFinder: UserFinder
  ) {}

  run(email: string): Book[] {
    const user = this.userFinder.run(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return this.repository.find();
  }
}
