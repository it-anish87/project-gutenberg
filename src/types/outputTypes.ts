import { Book } from "../entity/Book";

export type BooksRespose = {
  total: number;
  data: Book[];
};
