export type SuccessResponse = {
    status: string;
    statusCode: number;
    message: string;
    data: object | Array<any> | any;
    request: {
        method: string;
        url: string;
    };
} 

export type ErrorResponse = {
    status: string;
    statusCode: number;
    message: string;
    error: object | Array<any> | any;
    request: {
        method: string;
        url: string;
    };
}