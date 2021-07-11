import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

const SALT_ROUNDS = 10;

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('varchar', { length: 255 })
  login!: string;

  @Column('varchar', { length: 255 })
  password!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    await bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
      this.password = hash;
    });
  }

  public static toResponse(user: User): Pick<User, 'id' | 'name' | 'login'> {
    const { id, name, login } = user;
    return { id, name, login };
  }

  public static comparePassword = (
    receivedPassword: string,
    userPassword: string,
  ): Promise<boolean> => bcrypt.compare(receivedPassword, userPassword);
}
