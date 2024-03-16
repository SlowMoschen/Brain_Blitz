import { FilteredKeys } from 'src/Utils/Types/enum.types';
import { usersTimestampsTable } from '../Models/_index';

export type TimestampColumns = FilteredKeys<typeof usersTimestampsTable._.columns>;