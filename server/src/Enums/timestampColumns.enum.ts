import { FilteredKeys } from 'src/Utils/Types/enum.types';
import { usersTimestampsTable } from '../Models/_index';
import { extractKeysFromTable } from 'src/Utils/Helpers/extractKeysFromTable';

const timestampsArray = [...extractKeysFromTable(usersTimestampsTable)] as const;
export type TimestampColumns = FilteredKeys<typeof usersTimestampsTable._.columns>;