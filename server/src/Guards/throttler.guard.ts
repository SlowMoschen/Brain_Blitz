import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
	protected throwThrottlingException(
		context: ExecutionContext,
		throttlerLimitDetail: ThrottlerLimitDetail,
	): Promise<void> {
		const req = context.switchToHttp().getRequest();

		switch (req.url) {
			case '/auth/forgot-password':
				throw new ThrottlerException('Das zurücksetzen des Passworts ist nur 3 mal pro Tag möglich');
			case '/auth/resend-email-verification':
				throw new ThrottlerException('Das erneute senden der E-Mail-Verifizierung ist nur 1 mal pro Tag möglich');
			default:
				return super.throwThrottlingException(context, throttlerLimitDetail);
		}
	}
}
