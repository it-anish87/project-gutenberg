import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity()
export class Format extends BaseEntity {
  @Column()
  public mime_type!: string;

  @Column()
  public url!: string;

  @ManyToOne(() => Book, (book) => book.formats)
  public book!: Book;
}
