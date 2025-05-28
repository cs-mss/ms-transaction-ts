import { Observable, throwError } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';

export type Response<T> = {
  success: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T;
};

interface TypedRequest {
  url: string;
}

interface TypedResponse {
  status: (code: number) => TypedResponse;
  json: (data: any) => TypedResponse;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<unknown>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<TypedRequest>();
    const path = request.url;

    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        statusCode: HttpStatus.OK,
        path,
        message: 'Operation successful',
        data,
      })),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext): void {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<TypedRequest>();
    const response = ctx.getResponse<TypedResponse>();
    const path = request.url;

    this.logger.error(`Error in ${path}: ${exception.message}`);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      success: false,
      statusCode: status,
      path,
      message: exception.message || 'Internal server error',
      data: exception instanceof HttpException ? exception?.cause : null,
    });
  }
}
