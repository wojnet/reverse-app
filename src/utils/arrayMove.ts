export const arrayMove = (
  arr: any[],
  oldIndex: number,
  newIndex: number,
) => {
  let tempArr = [...arr];
  if (newIndex >= tempArr.length) {
    var k = newIndex - tempArr.length + 1;
    while (k--) {
      tempArr.push(undefined);
    }
  }
  tempArr.splice(newIndex, 0, tempArr.splice(oldIndex, 1)[0]);
  return tempArr;
};