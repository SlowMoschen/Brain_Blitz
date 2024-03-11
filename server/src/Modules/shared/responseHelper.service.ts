import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseHelperService {
    successResponse( code: number, message: string, data: object | Array<any> | any, request: { method: string; url: string }) {
        return {
            status: 'OK',
            code,
            message,
            data,
            request,
        };
    }

    errorResponse(status: string, code: number, message: string, error: object | Array<any> | Error, request: { method: string; url: string }) {
        return {
            status,
            code,
            message,
            error,
            request,
        };
    }
}