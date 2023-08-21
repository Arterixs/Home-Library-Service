import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  getMessage(message: any, context?: string) {
    return context ? `[${context}] ${message}` : `${message}`;
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

  log(message: any, context: string) {
    console.log('\x1b[32m', this.getTime(), this.getMessage(message, context));
  }

  error(message: any, context: string) {
    console.log('\x1b[31m', this.getMessage(message, context));
  }

  warn(message: any, context: string) {
    console.log('\x1b[33m', this.getMessage(message, context));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log('\x1b[90m');
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log('\x1b[34m');
  }
}
