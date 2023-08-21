import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, query, body } = req;
    this.logger.log(
      `baseUrl: ${baseUrl}, queryParams: ${JSON.stringify(
        query,
      )}, method: ${method}, body: ${JSON.stringify(body)}, statusCode: ${
        res.statusCode
      }`,
    );
    next();
  }
}
