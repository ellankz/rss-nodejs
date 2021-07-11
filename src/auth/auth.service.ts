import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const { login, password } = userLoginDto;
    const user = await this.usersService.findOneByLogin(login);
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password,
    );
    if (user && isPasswordCorrect) {
      const payload = { userId: user.id, login };
      return {
        token: this.jwtService.sign(payload),
      };
    }
  }
}
