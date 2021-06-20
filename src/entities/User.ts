import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/IUser";

@Entity({name: 'user'})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {length: 50})
  name!: string;
  
  @Column('varchar', {length: 50})
  login!: string;
  
  @Column('varchar', {length: 50})
  password!: string;
}