import { Injectable, LoggerService } from '@nestjs/common';
import { getTime } from 'src/common/helpers/getTime';
import { ColorsConsole } from 'src/common/types/colors';

@Injectable()
export class MyLogger implements LoggerService {
  getMessage(message: any, stack?: string, context?: string) {
    return context ? ` [ ${stack} ] [ ${context} ] ${message}` : `${message}`;
  }

  log(message: any, stack: string, context: string) {
    console.log(
      ColorsConsole.GREEN,
      getTime(),
      this.getMessage(message, stack, context),
    );
  }

  error(message: any, stack: string, context: string) {
    console.log(
      ColorsConsole.RED,
      getTime(),
      this.getMessage(message, stack, context),
    );
  }

  warn(message: any, stack: string, context: string) {
    console.log(
      ColorsConsole.YELLOW,
      getTime(),
      this.getMessage(message, stack, context),
    );
  }

  debug(message: any, stack: string, context: string) {
    console.log(
      ColorsConsole.MAGENTA,
      getTime(),
      this.getMessage(message, stack, context),
    );
  }

  verbose(message: any, stack: string, context: string) {
    console.log(
      ColorsConsole.CYAN,
      getTime(),
      this.getMessage(message, stack, context),
    );
  }
}
