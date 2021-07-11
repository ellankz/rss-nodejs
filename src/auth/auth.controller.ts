import {
  Controller,
  Post,
  HttpCode,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @HttpCode(200)
  async login(@Body() userLoginDto: UserLoginDto) {
    const res = await this.authService.login(userLoginDto);
    if (res) return res;
    throw new UnauthorizedException();
  }
}
