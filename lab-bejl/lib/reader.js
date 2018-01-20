'use strict';

const fs = require('fs');
const Bitmap = require('./bitmap.js');
const transform = require('./transform.js');
const reader = module.exports = {};

reader.readFile = function (path, transformation, destination) {
  console.log(path, destination, transformation);
  if (typeof transformation !== 'string') return null;
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
    }
    // console.log();
    const bitmapData = new Bitmap(data);
    const transformed = transform(bitmapData, transformation);
    fs.writeFile(destination, transformed.allData, (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

//reader.readFile(`${process.argv[2]}`, `${process.argv[3]}`, `${process.argv[4]}`);
// node reader.js '../assets/bitmap.bmp' 'black' './limitedchange.bmp'
