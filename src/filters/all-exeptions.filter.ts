import { Catch, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    super.catch(exception, host);
    this.logger.error('----------------------------');
    this.logger.error(`method: ${request.method}`);
    this.logger.error(`url: ${request.url}`);
    this.logger.error(`exception: ${exception}`);
    this.logger.error('----------------------------');
  }
}
