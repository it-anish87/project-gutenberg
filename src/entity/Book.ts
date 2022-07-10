import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

import { Author } from "./Author";
import { BaseEntity } from "./BaseEntity";
import { Bookshelf } from "./Bookshelf";
import { Format } from "./Format";
import { Language } from "./Language";
import { Subject } from "./Subject";

@Entity()
export class Book extends BaseEntity {
  @Column()
  public download_count!: number;

  @Column()
  public gutenberg_id!: number;

  @Column()
  public media_type!: string;

  @Column()
  public title!: string;

  @ManyToMany(() => Language)
  @JoinTable({
    name: "book_languages",
    inverseJoinColumn: {
      name: "language_id",
      referencedColumnName: "id",
    },
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
  })
  public languages!: Language[];

  @ManyToMany(() => Author)
  @JoinTable({
    name: "book_authors",
    inverseJoinColumn: {
      name: "author_id",
      referencedColumnName: "id",
    },
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
  })
  public authors!: Author[];

  @ManyToMany(() => Subject)
  @JoinTable({
    name: "book_subjects",
    inverseJoinColumn: {
      name: "subject_id",
      referencedColumnName: "id",
    },
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
  })
  public subjects!: Subject[];

  @ManyToMany(() => Bookshelf)
  @JoinTable({
    name: "book_bookshelves",
    inverseJoinColumn: {
      name: "bookshelf_id",
      referencedColumnName: "id",
    },
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
  })
  public bookshlefs!: Bookshelf[];

  @OneToMany(() => Format, (format: Format) => format.book)
  public formats!: Format[];
}
