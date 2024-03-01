let str = "My name is , Saad Abbasi";

// charAt(index)
let charAtIndex = str.charAt(7);
console.log(str);

// charCodeAt(index)
let unicodeValue = str.charCodeAt(0);

// concat(str1, str2, ...)
let str1 = " Have";
let str2 = " a";
let str3 = " nice";
let str4 = " day!";
let combinedStr = str.concat(str1, str2, str3, str4);
console.log(combinedStr);
// indexOf(substring)
let indexOfWorld = str.indexOf("World");
console.log(indexOfWorld);

// lastIndexOf(substring)
let lastIndexOfl = str.lastIndexOf("l");
console.log(lastIndexOfl);
// slice(startIndex, endIndex)
let slicedStr = str.slice(7, 12);
console.log(slicedStr);

// substring(startIndex, endIndex)
let subStr = str.substring(0, 5);
console.log(subStr)

// substr(startIndex, length)
let substr = str.substr(7, 5);

// toUpperCase()
let upperCaseStr = str.toUpperCase();
console.log(upperCaseStr)
// toLowerCase()
let lowerCaseStr = str.toLowerCase();
console.log(lowerCaseStr)

// trim()
let stringWithSpaces = "   Hello, World!   ";
let trimmedStr = stringWithSpaces.trim();

// replace(searchValue, replaceValue)
let replacedStr = str.replace("World", "Universe");

// split(separator)
let wordsArray = str.split(", ");

// startsWith(prefix)
let startsWithHello = str.startsWith("Hello");

// endsWith(suffix)
let endsWithWorld = str.endsWith("World!");

// includes(substring)
let includesHello = str.includes("Hello");

// repeat(count)
let repeatedStr = "Abc".repeat(3);

// match(regexp)
let matchRegex = /o/g;
let matches = str.match(matchRegex);

// search(regexp)
let searchRegex = /o/;
let searchResult = str.search(searchRegex);

// toString()
let strObject = new String("Hello");
let strValue = strObject.toString();
console.log(trimmedStr,"\n",replacedStr,"\n",wordsArray,"\n",startsWithHello,"\n",endsWithWorld,"\n",includesHello,"\n",repeatedStr,"\n",searchResult)