import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity()
export class Author extends BaseEntity {
  @Column()
  public birth_year!: number;

  @Column()
  public death_year!: number;

  @Column()
  public name!: string;

  @ManyToMany(() => Book)
  @JoinTable()
  public book!: Book[];
}
