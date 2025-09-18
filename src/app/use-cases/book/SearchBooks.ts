import { BookSearcher } from "@/domain/models/book/BookSearcher";
import { InMemoryBookRepository } from "@/infrastructure/repositories/book/InMemoryBookRepository";
import { UserFinder } from "@/domain/models/services/UserFinder";
import SupabaseUserRepository from "@/domain/models/repositories/SupabaseUserRepository"; // Importa el repositorio

export class SearchBook {
  private readonly searcher: BookSearcher;

  constructor() {
    const bookRepository = new InMemoryBookRepository();
    const userRepository = new SupabaseUserRepository(); 
    const userFinder = new UserFinder(userRepository); 
    this.searcher = new BookSearcher(bookRepository, userFinder);
  }

  async run(email: string) {
    const books = await this.searcher.run(email); 
    return books.map(book => book.toPrimitives());
  }
}