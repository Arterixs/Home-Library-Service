import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getContext } from '../helpers/getContext';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, query, body } = req;
    const bodyReq = JSON.stringify(body);
    const queryReq = JSON.stringify(query);
    res.on('finish', () => {
      if (res.statusCode < 400) {
        this.logger.log(
          this.message(baseUrl, queryReq, method, bodyReq, res.statusCode),
          'LOG',
          getContext(baseUrl),
        );
      } else if (res.statusCode < 500) {
        this.logger.warn(
          this.message(baseUrl, queryReq, method, bodyReq, res.statusCode),
          'WARN',
          getContext(baseUrl),
        );
      } else {
        this.logger.error(
          this.message(baseUrl, queryReq, method, bodyReq, res.statusCode),
          'ERROR',
          getContext(baseUrl),
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
