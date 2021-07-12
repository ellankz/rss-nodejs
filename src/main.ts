import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exeptions.filter';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const useFastify = process.env['USE_FASTIFY'] === 'true';
  const app = useFastify
    ? await NestFactory.create(AppModule, new FastifyAdapter())
    : await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const usersService = app.get(UsersService);
  const user = usersService.findOneByLogin('admin');
  if (!user) {
    await usersService.create({
      name: 'admin',
      login: 'admin',
      password: 'admin',
    });
  }
  await app.listen(configService.get('PORT'));
}
bootstrap();
