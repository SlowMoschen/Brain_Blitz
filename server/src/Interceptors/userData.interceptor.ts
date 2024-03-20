import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

// This interceptor is used to remove valuable data from the users
// Will be used specificly on the routes we want it to apply

@Injectable()
export class UserDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => this.responseHandler(data, context)),
        );
    }

    responseHandler(data: any, context: ExecutionContext) {

        // check if data is array - removed password for every user
        if (Array.isArray(data)) {
            data.forEach((user: any) => {
                delete user.password;
            });
        } else {
            delete data.password;
        }

        return data;
    }
}