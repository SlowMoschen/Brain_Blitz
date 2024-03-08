type ExcludedKeys = 'id' | 'user_id';

// Use the keyof utility type to get the keys of the object
type KeysOfType<T> = keyof { [K in keyof T]: true };

// Use the Exclude utility type to remove the ExcludedKeys from the KeysOfType - this will give us the keys we want to use as the enum
export type FilteredKeys<T> = Exclude<KeysOfType<T>, ExcludedKeys>;
