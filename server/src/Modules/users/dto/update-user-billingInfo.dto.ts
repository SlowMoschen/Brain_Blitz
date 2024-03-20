import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { SQL } from 'drizzle-orm';
import { PaymentMethod, PaymentStatus } from 'src/Enums/payment.enum';

export class UpdateUserBillingInfoDTO {
	@ApiProperty({ required: false, example: 'Somestreet' })
	@IsOptional()
	@IsString()
	@MinLength(2)
	billing_address: string;

	@ApiProperty({ required: false, example: 'Somecity' })
	@IsOptional()
	@IsString()
	@MinLength(2)
	billing_city: string;

	@ApiProperty({ required: false, example: 'Somestate' })
	@IsOptional()
	@IsString()
	@MinLength(2)
	billing_state: string;

	@ApiProperty({ required: false, example: '1220' })
	@IsOptional()
	@IsString()
	@MinLength(2)
	billing_zip: string;

	@ApiProperty({ required: false, example: 'Austria' })
	@IsOptional()
	@IsString()
	@MinLength(2)
	billing_country: string;

	@ApiProperty({
		enum: PaymentStatus,
		enumName: 'PaymentStatus',
		examples: ['none', 'pending', 'paid', 'failed', 'refunded'],
	})
	@IsOptional()
	@IsString()
	payment_status: SQL;

	@ApiProperty({ enum: PaymentMethod, enumName: 'PaymentMethod', examples: ['PAYPAL', 'BANK_TRANSFER'] })
	@IsOptional()
	@IsString()
	payment_method: SQL;

	@ApiProperty({ required: false, example: '2021-10-10' })
	@IsOptional()
	@IsString()
	payment_date: Date;
}
