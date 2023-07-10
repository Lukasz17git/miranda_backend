

export const generateMySqlCreationKeys = (keys: string[]) => {
   return {
      sqlKeys: `(${keys.join(', ')})`,
      sqlValues: `(${keys.map(k => '?').join(', ')})`
   }
}

export const generateMySqlUpdateKeys = (keys: string[]) => {
   return {
      sqlKeyValue: keys.map(key => `${key} = ?`).join(', ')
   }
}
