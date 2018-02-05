/*Task 2: Set*/

let array1 = [1, 2, 3, 4, 5, 5, 1, 0],
    array2 = ['a', 'b', 'b', 'd', 'e'];

//Create set from few arrays
let combinedSet = new Set(array1.concat(array2));

//Array from Set
let arrayFromSet = Array.from(combinedSet);
