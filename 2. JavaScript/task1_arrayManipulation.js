/*Task 1: Array Manipulation*/

let array = ['code1', 'code2345', 'code333', 'code401'];

//Add N string elements to the array.
const addElements = (arr, str, number) => {
    let arrCopy = arr.slice(0);
    let newArray = new Array(number).fill(str);
    return arrCopy.concat(newArray);
};
let newArray = addElements(array, 'text', 2);

//Combine 2 arrays so result array contains all elements from both initial arrays
let combinedArray = newArray.concat(array);

//Remove duplicates form result array from task #2
let noDuplicatesArray = Array.from(new Set(combinedArray));

//Filter only elements that contain 5+ chars
let smallerThanFive = combinedArray.filter(word => word.length>=5);

//Create new array from result in task #2 that will contain element from initial with added ' CODE' to each one
let addCode = newArray.map(word => word + 'CODE');
