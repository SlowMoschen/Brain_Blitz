import {
	CallHandler,
	ExecutionContext,
	HttpCode,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data: any) => this.responseHandler(data, context)),
			catchError((error: HttpException) => throwError(() => this.errorHandler(error, context))),
		);
	}

	responseHandler(data: any, context: ExecutionContext) {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest();
		const response = ctx.getResponse();

		const statusCode = response.statusCode;

		return {
			status: 'ok',
			statusCode,
			data,
			request: {
				method: request.method,
				path: request.url,
			},
		};
	}

	errorHandler(exeption: HttpException, context: ExecutionContext) {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest();
		const response = ctx.getResponse();

		const status = exeption instanceof HttpException ? exeption.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		response.status(status).json({
			status: 'error',
			statusCode: status,
			message: exeption.message,
			request: {
				method: request.method,
				path: request.url,
			},
		});
	}
}
