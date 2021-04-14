const { Converter, Archiver } = require('./json2csv/index.js');
const path = require("path");

const filename = path.join(__dirname, "/data/comments.json");
const newFilename = path.join(__dirname, "/data/comments.csv");
const extractPath = path.join(__dirname, "/data/comments_1.csv");
const options = { encoding: "utf8", };
const allowedFields = ['postId', 'id', 'name'];

const converter = new Converter(allowedFields);
const archiver = new Archiver();

// converter.convert(filename, newFilename, options);
// console.log(converter.convert(filename, newFilename, options));
converter.convert(filename, newFilename, options)
  .then((archiveFile) => {
    return archiver.archive(archiveFile);
  })
  .then((archivedPath) => {
    // console.log('2_1+2_1+2_1+2_1+2_1+2_1');
    archiver.extract(archivedPath, extractPath);
  });