import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Book } from "./Book";

@Entity()
export class Subject extends BaseEntity {
  @Column()
  public name!: string;

  @ManyToMany(() => Book)
  @JoinTable()
  public book!: Book[];
}
