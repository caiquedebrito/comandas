import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        message = exception.getResponse()['message'] || exception.message;
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      console.error('Exception caught by global filter:', exception);

      response.status(status).json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
      });
  }
}