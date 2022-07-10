import { SelectQueryBuilder } from "typeorm";

import { Book } from "../entity/Book";
import { BookRepository } from "../repository/BookRespository";
import { InputFilters } from "../types/inputTypes";
import { BooksRespose } from "../types/outputTypes";

export class BookController {
  static async getBooks(
    filters: InputFilters,
    page = 1,
    perPage = 25
  ): Promise<BooksRespose | string> {
    try {
      // handle incorrect page number input
      page = page > 0 ? page : 1;

      // Generate the query with all provided filters and use the same query to get total count and filterred data
      const booksQuery: SelectQueryBuilder<Book> =
        await BookRepository.getBooks(filters);

      // Handle pagination
      const total: number = await booksQuery.getCount();
      const offset: number = (page - 1) * perPage;

      // Get paginated books data
      const data: Book[] = await booksQuery
        .skip(offset)
        .take(perPage)
        .getMany();

      return {
        total,
        data,
      };
    } catch (err) {
      return (err as Error).message;
    }
  }
}
