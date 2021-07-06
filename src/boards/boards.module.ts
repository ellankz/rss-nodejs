import { Module } from '@nestjs/common';
import { UsersService } from './boards.service';
import { UsersController } from './boards.controller';
import { User } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
