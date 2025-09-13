import { BookId } from "./value-objects/bookId";
import { BookTitle } from "./value-objects/bookTitle";
import { BookAuthor } from "./value-objects/bookAuthor";

export class Book {
  constructor(
    private readonly id: BookId,
    private readonly title: BookTitle,
    private readonly author: BookAuthor
  ) {}

  getId(): BookId {
    return this.id;
  }

  getTitle(): BookTitle {
    return this.title;
  }

  getAuthor(): BookAuthor {
    return this.author;
  }

  toPrimitives() {
    return {
      id: this.id.getValue(),
      title: this.title.getValue(),
      author: this.author.getValue(),
    };
  }
}