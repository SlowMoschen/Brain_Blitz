import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from 'src/Utils/constants';

export function InjectDatabase() {
	return Inject(DB_CONNECTION);
}
