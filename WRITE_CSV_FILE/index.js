const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');
 
const header = ['number', 'first', 'last', 'handle'];
const dataArrays = [
  [1, 'Mark', 'Otto', '@mdo'],
  [2, 'Jacob', 'Thornton', '@fat'],
  [3, 'Larry', 'the Bird', '@twitter'],
];

const csvFromArrayOfArrays = convertArrayToCSV(dataArrays, {
    header,
    separator: ','
  });

fs.writeFile('output.csv', csvFromArrayOfArrays, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  })