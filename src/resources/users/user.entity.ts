import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import bcrypt from 'bcrypt';
import { IUser } from "../../interfaces/IUser";

const SALT_ROUNDS = 10;

@Entity({name: 'user'})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {length: 255})
  name!: string;
  
  @Column('varchar', {length: 255})
  login!: string;
  
  @Column('varchar', {length: 255})
  password!: string;

  @BeforeInsert()
    async hashPassword(): Promise<void> {
      await bcrypt.hash(this.password, SALT_ROUNDS).then(hash => {
        this.password = hash;
      });
    }

  public static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }

  public comparePassword = (receivedPassword: string): Promise<boolean> => bcrypt.compare(receivedPassword, this.password);
}