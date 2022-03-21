export const removeDuplicate = (lista) => {
  var unique = []
  lista.forEach(element => {
    if(!(unique.map(element => element.ID)).includes(element.ID)) {
      unique.push(element)
    }
  })
  return unique
}