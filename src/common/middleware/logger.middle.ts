import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, query, body } = req;
    const bodyReq = JSON.stringify(body);
    const queryReq = JSON.stringify(query);

    res.on('close', () => {
      if (res.statusCode < 400) {
        this.logger.log(
          this.message(baseUrl, queryReq, method, bodyReq, res.statusCode),
          'LOG',
        );
      } else if (res.statusCode < 500) {
        this.logger.warn(
          this.message(baseUrl, queryReq, method, bodyReq, res.statusCode),
          'WARN',
        );
      } else {
        this.logger.error(
          this.message(baseUrl, queryReq, method, bodyReq, res.statusCode),
          'ERROR',
        );
      }
    });
    next();
  }

  message(
    baseUrl: string,
    query: string,
    method: string,
    body: string,
    statusCode: number,
  ) {
    return `baseUrl: ${baseUrl}, queryParams: ${query}, method: ${method}, body: ${body}, statusCode: ${statusCode}`;
  }
}
