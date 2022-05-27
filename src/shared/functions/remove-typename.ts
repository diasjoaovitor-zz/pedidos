export const removeTypename = (obj: any) => {
  if(obj.__typename)
    delete obj['__typename']
  return obj
}