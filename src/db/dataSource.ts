import "reflect-metadata";

import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Author } from "../entity/Author";
import { Book } from "../entity/Book";
import { Bookshelf } from "../entity/Bookshelf";
import { Format } from "../entity/Format";
import { Language } from "../entity/Language";
import { Subject } from "../entity/Subject";

// Load .env
dotenv.config();

// Define data source
export const appDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST_IP || "localhost",
  port: Number(process.env.PG_HOST_IP) || 5432,
  username: process.env.PG_USER_NAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
  synchronize: false,
  logging: true,
  entityPrefix: "books_",
  entities: [Book, Format, Language, Author, Bookshelf, Subject],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});
