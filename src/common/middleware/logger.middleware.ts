import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log('----------------------------');
      this.logger.log(`statusCode: ${statusCode}`);
      this.logger.log(`method: ${method}`);
      this.logger.log(`url: ${originalUrl}`);
      if (body && Object.keys(body).length) {
        this.logger.log(`body: ${JSON.stringify(body)}`);
      }
      if (query && Object.keys(query).length) {
        this.logger.log(`query: ${JSON.stringify(query)}`);
      }
      this.logger.log('----------------------------');
    });

    next();
  }
}
