/*Task 1: Array Manipulation*/

let array = ['code1', 'code2345', 'code333', 'code401'];

//Add N string elements to the array.
addElements = (arr, str, number) => {
  let rArray = arr.slice(0);
  for (i=0; i<number; i++){
    rArray.push(str);
  }
  return rArray;
}
let newArray = addElements(array, 'text', 2);
console.log('1:', array, newArray);

//Combine 2 arrays so result array contains all elements from both initial arrays
let combinedArray = newArray.concat(array);
console.log('2:', combinedArray);

//Remove duplicates form result array from task #2
let noDuplicatesArray = Array.from(new Set(combinedArray));
console.log(noDuplicatesArray);

//Filter only elements that contain 5+ chars
let smallerThanFive = combinedArray.filter(word => word.length>=5)
console.log(smallerThanFive);

//Create new array from result in task #2 that will contain element from initial with added ' CODE' to each one
let addCode = newArray.map(word => word + 'CODE');
console.log(addCode);