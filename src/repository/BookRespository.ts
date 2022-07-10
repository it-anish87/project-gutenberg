import { SelectQueryBuilder } from "typeorm";

import { appDataSource } from "../db/dataSource";
import { Book } from "../entity/Book";
import { InputFilters } from "../types/inputTypes";
import { BookRepositoryHelper } from "./helpers/BookRepositoryHelper";

export const BookRepository = appDataSource.getRepository(Book).extend({
  // Custom method to generate query with optional filters
  async getBooks(filters: InputFilters): Promise<SelectQueryBuilder<Book>> {
    const books: SelectQueryBuilder<Book> = this.createQueryBuilder("book")
      .leftJoinAndSelect("book.languages", "languages")
      .leftJoinAndSelect("book.authors", "authors")
      .leftJoinAndSelect("book.subjects", "subjects")
      .leftJoinAndSelect("book.bookshlefs", "bookshlefs")
      .leftJoinAndSelect("book.formats", "formats")
      .orderBy("book.download_count", "DESC")
      .where("1 = 1"); // Adding a default where so that we can add optional where clauses later

    // Apply filters if passed on payload
    if (filters) {
      return BookRepositoryHelper.applyFilters(books, filters);
    }
    return books;
  },
});
