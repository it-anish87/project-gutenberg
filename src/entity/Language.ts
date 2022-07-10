import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity()
export class Language extends BaseEntity {
  @Column()
  public code!: string;

  @ManyToMany(() => Book)
  @JoinTable()
  public book!: Book[];
}
