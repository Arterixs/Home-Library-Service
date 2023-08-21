import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  getMessage(message: any, stack?: string, context?: string) {
    return context ? ` [ ${stack} ] [ ${context} ] ${message}` : `${message}`;
  }

  getTime() {
    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = date.getMonth();
    const getDay = date.getDate();
    const getHours = date.getHours();
    const getMinutes = date.getMinutes();
    const getSeconds = date.getSeconds();
    const hours = getHours < 10 ? `0${getHours}` : `${getHours}`;
    const minutes = getMinutes < 10 ? `0${getMinutes}` : `${getMinutes}`;
    const seconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`;
    return `[${getDay}/${getMonth}/${getYear}, ${hours}:${minutes}:${seconds}]`;
  }

  log(message: any, stack: string, context: string) {
    console.log(
      '\x1b[32m',
      this.getTime(),
      this.getMessage(message, stack, context),
    );
  }

  error(message: any, stack: string, context: string) {
    console.log(
      '\x1b[31m',
      this.getTime(),
      this.getMessage(message, stack, context),
    );
  }

  warn(message: any, stack: string, context: string) {
    console.log(
      '\x1b[33m',
      this.getTime(),
      this.getMessage(message, stack, context),
    );
  }

  debug(message: any, stack: string, context: string) {
    console.log(
      '\x1b[35m',
      this.getTime(),
      this.getMessage(message, stack, context),
    );
  }

  verbose(message: any, stack: string, context: string) {
    console.log(
      '\x1b[36m',
      this.getTime(),
      this.getMessage(message, stack, context),
    );
  }
}
