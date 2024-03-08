import { FilteredKeys } from 'src/Utils/Types/enum.types';
import { usersTimestampsTable } from '../Models/_index';

const timestampsArray = [
	...Object.keys(usersTimestampsTable)
		.filter((column) => column !== 'id' && column !== 'user_id')
		.map((column) => column.toUpperCase()),
] as const;
console.log(timestampsArray);

export type TimestampColumns = FilteredKeys<typeof usersTimestampsTable._.columns>;