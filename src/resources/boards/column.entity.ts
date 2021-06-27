import { Entity, Column as DBColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IBoard } from "../../interfaces/IBoard";


@Entity({name: 'column'})
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @DBColumn('varchar', {length: 255})
  title!: string;

  @DBColumn('integer')
  order!: number;

  @ManyToOne('Board', 'columns', {onDelete: 'CASCADE'}) 
  board!: IBoard; 
}

