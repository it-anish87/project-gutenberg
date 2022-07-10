import { Brackets, SelectQueryBuilder } from "typeorm";

import { Book } from "../../entity/Book";
import { InputFilters } from "../../types/inputTypes";

export class BookRepositoryHelper {
  static applyFilters(
    books: SelectQueryBuilder<Book>,
    filters: InputFilters
  ): SelectQueryBuilder<Book> {
    const { bookIds, languages, mimeTypes, topics, authors, titles } = filters;
    // Add gutenberg_id filter if present in request payload
    if (bookIds && bookIds.length > 0) {
      books.andWhere("book.gutenberg_id IN(:...bookIds)", {
        bookIds,
      });
    }

    // Add languages filter if present in request payload
    if (languages && languages.length > 0) {
      books.andWhere("LOWER(languages.code) IN(:...codes)", {
        codes: languages.map((l) => l.toLocaleLowerCase()),
      });
    }

    // Add mime-type filter if present in request payload
    if (mimeTypes && mimeTypes.length > 0) {
      books.andWhere("LOWER(formats.mime_type) IN(:...mimeTypes)", {
        mimeTypes: mimeTypes.map((l) => l.toLocaleLowerCase()),
      });
    }

    //Add topic filter if present in request payload
    if (topics && topics.length > 0) {
      books.andWhere(
        new Brackets((qb) => {
          // Add topic filter on subjects
          qb.where("LOWER(subjects.name) Like LOWER(:topic0)", {
            topic0: `%${topics[0]}%`,
          });

          for (let i = 1; i < topics.length; i++) {
            qb.orWhere(`LOWER(subjects.name) Like LOWER(:topic${i})`, {
              [`topic${i}`]: `%${topics[i]}%`,
            });
          }

          // Add topic filter on bookshlefs
          for (let i = 0; i < topics.length; i++) {
            qb.orWhere(`LOWER(bookshlefs.name) Like LOWER(:topic${i})`, {
              [`topic${i}`]: `%${topics[i]}%`,
            });
          }
        })
      );
    }

    //Add topic filter on bookshelf if present in request payload
    if (authors && authors.length > 0) {
      books.andWhere(
        new Brackets((qb) => {
          qb.where("LOWER(authors.name) Like LOWER(:authors0)", {
            authors0: `%${authors[0]}%`,
          });

          for (let i = 1; i < authors.length; i++) {
            qb.orWhere(`LOWER(authors.name) Like LOWER(:authors${i})`, {
              [`authors${i}`]: `%${authors[i]}%`,
            });
          }
        })
      );
    }

    //Add topic filter on bookshelf if present in request payload
    if (titles && titles.length > 0) {
      books.andWhere(
        new Brackets((qb) => {
          qb.where("LOWER(book.title) Like LOWER(:titles0)", {
            titles0: `%${titles[0]}%`,
          });

          for (let i = 1; i < titles.length; i++) {
            qb.orWhere(`LOWER(book.title) Like LOWER(:titles${i})`, {
              [`titles${i}`]: `%${titles[i]}%`,
            });
          }
        })
      );
    }

    return books;
  }
}
