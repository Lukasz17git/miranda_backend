

const generateMongoArrayFilterUpdateObject = (nestedObjectUpdate: Record<string, any>, arrayPathKey: string, arrayFilterName: string) => {
   const arrayFilter = arrayPathKey + `.$[${arrayFilterName}].`
   const mongoArrayFilterQuery: Record<string, any> = {}
   Object.keys(nestedObjectUpdate).forEach(key => {
      mongoArrayFilterQuery[arrayFilter + key] = nestedObjectUpdate[key]
   })
   return mongoArrayFilterQuery
}

export default generateMongoArrayFilterUpdateObject