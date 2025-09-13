import { Book } from "../book";

export interface BookRepository {
  find(): Array<Book>;
}
