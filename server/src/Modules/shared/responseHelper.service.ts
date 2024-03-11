import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseHelperService {
    successResponse( statusCode: number, message: string, data: object | Array<any> | any, request: { method: string; url: string }) {
        return {
            status: 'OK',
            statusCode,
            message,
            data,
            request,
        };
    }

    errorResponse(status: string, statusCode: number, message: string, error: object | Array<any> | Error, request: { method: string; url: string }) {
        return {
            status,
            statusCode,
            message,
            error,
            request,
        };
    }
}