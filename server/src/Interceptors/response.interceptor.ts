import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

// This interceptor is used to handle the response of the server
// It will format the response to a standard format
// It will also handle the errors and format them to a standard format

// The standard format for a successful request will be:
// {
//     status: 'ok',
//     statusCode: number,
//     data: any, (this will be the data returned from the server)
//     request: {
//         method: string,
//         path: string,
//     },
// }
//
// The status and statusCode will be used to determine if the request was successful or not
// The message will be used to display the error message
// The data will be used to display the data returned from the server
// The request will be used to display the request method and path

// The standard format for an error request will be:
// {
//     status: 'error',
//     statusCode: number,
//     message: string,
//     request: {
//         method: string,
//         path: string,
//     },
// }

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
		const message = exeption instanceof BadRequestException ? exeption.getResponse()['message'][0] : exeption.message;

		response.status(status).json({
			status: 'error',
			statusCode: status,
			message: message,
			request: {
				method: request.method,
				path: request.url,
			},
		});
	}
}
