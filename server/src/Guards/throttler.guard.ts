import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";
import { ThrottlerLimitDetail } from "@nestjs/throttler/dist/throttler.guard.interface";

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard{
    protected throwThrottlingException(context: ExecutionContext, throttlerLimitDetail: ThrottlerLimitDetail): Promise<void> {
        const req = context.switchToHttp().getRequest();   

        switch (req.url) {
            case '/auth/forgot-password':
                throw new ThrottlerException('Too many requests for forgot password');
            default:
                return super.throwThrottlingException(context, throttlerLimitDetail);
        }
    }
}