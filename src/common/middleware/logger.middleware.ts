import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(`Request: ${method} ${originalUrl} ${statusCode}`);
      if (Object.keys(query).length) {
        this.logger.log(`QUERY`);
        this.logger.log(query);
      }
      if (Object.keys(body).length) {
        this.logger.log(`BODY`);
        this.logger.log(body);
      }
    });

    next();
  }
}
