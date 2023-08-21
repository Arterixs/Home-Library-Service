import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private message: string;
  private statusCode: number;
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const objectError = exception.getResponse();
      this.message = objectError['message'];
      this.statusCode = objectError['statusCode'];
    } else {
      this.message = 'Internal server error';
      this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(this.statusCode);
    response.json(this.createMessage());
  }

  createMessage() {
    return { statusCode: this.statusCode, message: this.message };
  }
}
