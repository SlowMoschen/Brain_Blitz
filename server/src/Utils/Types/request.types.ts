import { Request } from "express";

export type ModifiedRequest = Request & {
    user: string;
}