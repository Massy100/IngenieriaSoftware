import { UserFinder } from "../../services/UserFinder";
import { InMemoryBookRepository } from "@/infrastructure/repositories/book/InMemoryBookRepository";
import { BookSearcher } from "../../book/BookSearcher";

export class GetUserBooksUseCase {
  private bookSearcher: BookSearcher;

  constructor(
    private userFinder: UserFinder,
    bookRepository?: InMemoryBookRepository
  ) {
    const repository = bookRepository || new InMemoryBookRepository();
    this.bookSearcher = new BookSearcher(repository, userFinder);
  }

  async execute(userEmail: string): Promise<any[]> {
    if (!userEmail) {
      throw new Error('User email is required');
    }

    const user = await this.userFinder.run(userEmail);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.getIsValid()) {
      throw new Error('User is not valid');
    }

    const books = await this.bookSearcher.run(userEmail);
    
    return books;
  }
}