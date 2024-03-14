import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserKeys } from "src/Utils/Types/request.types";

export const User = createParamDecorator((data: UserKeys, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user[data];
})