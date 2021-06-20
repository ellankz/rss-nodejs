import { Entity, Column as DBColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IBoard } from "../interfaces/IBoard";


@Entity({name: 'column'})
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @DBColumn('varchar', {length: 50})
  title!: string;

  @DBColumn('integer')
  order!: number;

  @ManyToOne('Board', 'columns') 
  board!: IBoard; 
}
