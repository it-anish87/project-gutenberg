import { Application, Request, Response } from "express";

import { BookController } from "../controller/BookController";
import { InputFilters } from "../types/inputTypes";
import { BooksRespose } from "../types/outputTypes";

export const routes = (app: Application): void => {
  // API routes to get books by filter with pagination
  app.get("/api/books", async (req: Request, res: Response) => {
    const {
      filters,
      page,
      pageSize,
    }: { filters: InputFilters; page: number; pageSize: number } = req.body;
    const books: BooksRespose | string = await BookController.getBooks(
      filters,
      page,
      pageSize
    );
    return res.json(books);
  });

  // Handle 404 response
  app.all(/^\/.*/, function (req, res) {
    res.status(404).send("API not found!");
  });
};
