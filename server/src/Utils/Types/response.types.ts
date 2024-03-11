export type SuccessResponse = {
    status: string;
    code: number;
    message: string;
    data: object | Array<any> | any;
    request: {
        method: string;
        url: string;
    };
} 

export type ErrorResponse = {
    status: string;
    code: number;
    message: string;
    error: object | Array<any> | any;
    request: {
        method: string;
        url: string;
    };
}