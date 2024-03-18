import * as tables from '../Models/_tables';

export const clearDB = async (dbConnection) => {
  try {
    const reveresedTables = Object.keys(tables).reverse();
    
    for (const table of reveresedTables) {
      await dbConnection.delete(tables[table]);
    }
    
    console.log('Database cleared');
  } catch (err) {
    console.error(err);
  }
};