import { BookRepository } from "@/domain/models/book/interfaces/BookRepository";
import { Book } from "@/domain/models/book/book";
import { BookId } from "@/domain/models/book/value-objects/bookId";
import { BookTitle } from "@/domain/models/book/value-objects/bookTitle";
import { BookAuthor } from "@/domain/models/book/value-objects/bookAuthor";

export class InMemoryBookRepository implements BookRepository {
  private books: Book[];

  constructor() {
    this.books = [
      new Book(new BookId("1"), new BookTitle("El Principito"), new BookAuthor("Antoine de Saint-Exupéry")),
      new Book(new BookId("2"), new BookTitle("Cien Años de Soledad"), new BookAuthor("Gabriel García Márquez")),
      new Book(new BookId("3"), new BookTitle("Don Quijote de la Mancha"), new BookAuthor("Miguel de Cervantes"))
    ];
  }

  find(): Book[] {
    return this.books;
  }

  search(): Book[] {
    return this.find();
  }
}
