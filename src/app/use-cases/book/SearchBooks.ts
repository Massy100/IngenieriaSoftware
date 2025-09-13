import { BookSearcher } from "@/domain/models/book/BookSearcher";
import { InMemoryBookRepository } from "@/infrastructure/repositories/book/InMemoryBookRepository";
import { UserFinder } from ".@/domain/models/user/.."; //Aqui tampoco encontre UserFinder jajaj

export class SearchBook {
  private readonly searcher: BookSearcher;

  constructor() {
    const repository = new InMemoryBookRepository();
    const userFinder = new UserFinder(); 
    this.searcher = new BookSearcher(repository, userFinder);
  }

  async run(email: string) {
    const books = this.searcher.run(email);

    return books.map(book => book.toPrimitives());
  }
}
