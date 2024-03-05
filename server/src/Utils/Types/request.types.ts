import { Request } from "express";

export type ModifiedRequest = Request & {
    user: {
        id: string;
        role: string[];
    };
}