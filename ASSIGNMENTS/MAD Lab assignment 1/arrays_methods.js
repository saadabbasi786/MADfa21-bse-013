let numbers = [1, 2, 3, 4, 5];

// concat(arr1, arr2, ...)
let arr1 = [6, 7];
let arr2 = [8, 9];
let combinedArray = numbers.concat(arr1, arr2);
console.log(combinedArray)

// indexOf(element)
let indexOfThree = numbers.indexOf(3);
console.log(indexOfThree)
// lastIndexOf(element)
let lastIndexOfTwo = numbers.lastIndexOf(2);
console.log(lastIndexOfTwo)
// push(element1, element2, ...)
let pushedArray = [...numbers];
pushedArray.push(6, 7);
console.log(pushedArray)
// pop()
let poppedElement = pushedArray.pop();
console.log(poppedElement)
// shift()
let shiftedElement = pushedArray.shift();
console.log(shiftedElement)
// unshift(element1, element2, ...)
let unshiftedArray = [...numbers];
unshiftedArray.unshift(0, -1);
console.log(unshiftedArray)
// slice(startIndex, endIndex)
let slicedArray = numbers.slice(1, 4);
console.log(slicedArray)
// splice(startIndex, deleteCount, elem1, elem2, ...)
let splicedArray = [...numbers];
splicedArray.splice(2, 2, 10, 11);
console.log(splicedArray)
// reverse()
let reversedArray = [...numbers];
reversedArray.reverse();
console.log(reversedArray)
// join(separator)
let joinedString = numbers.join("-");
console.log(joinedString)
// toString()
let arrayObject = new Array(1, 2, 3);
let arrayString = arrayObject.toString();

// forEach(callback)
let doubledArray = [];
numbers.forEach(function (number) {
  doubledArray.push(number * 2);
});
console.log(doubledArray)

// map(callback)
let squaredArray = numbers.map(function (number) {
  return number ** 2;
});
console.log(squaredArray)

// filter(callback)
let evenNumbers = numbers.filter(function (number) {
  return number % 2 === 0;
});
console.log(evenNumbers)

// reduce(callback)
let sum = numbers.reduce(function (acc, curr) {
  
    return acc + curr;
}, 0);

// every(callback)
let allGreaterThanZero = numbers.every(function (number) {
 
    return number > 0;
});
console.log(allGreaterThanZero)

// some(callback)
let someGreaterThanFour = numbers.some(function (number) {
 return number > 4;
});
console.log(someGreaterThanFour)

