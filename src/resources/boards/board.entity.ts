import { Entity, Column as DBColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IBoard } from "../../interfaces/IBoard";
import { IColumn } from "../../interfaces/IColumn";


@Entity({name: 'board'})
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @DBColumn('varchar', {length: 50})
  title!: string;

  @OneToMany('Column', 'board')
  columns?: IColumn[];  
}

