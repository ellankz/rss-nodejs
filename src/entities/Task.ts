import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ITask } from "../interfaces/ITask";

@Entity({name: 'task'})
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {length: 50})
  title!: string;
  
  @Column('integer')
  order!: string;
  
  @Column('varchar', {length: 200})
  description!: string;

  @Column('uuid', {nullable: true})
  userId!: string | null;

  @Column('uuid')
  boardId!: string;

  @Column('uuid')
  columnId!: string;
}