import { Request } from "express";

export type ReqWithUser = Request & {
    logout: (cb: (err: Error) => void) => void;
    user: {
        id: string;
        roles: string[];
    };
}