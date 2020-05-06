const path = require('path');
const fs = require('fs');

let result = '';

const h1 = '# js-patterns-youtube\nJavaScript Patterns Demo\n\n';

const removeComments = (data) => data.replace(/\/\/.*\n+/g, '');
const formatToCodeMD = (data) => `\`\`\`js\n${data}\`\`\``;
const getH2 = (path) => `## ${path.replace(/\d+\s+/, '').toUpperCase()}\n`;
const getH3 = (path) => `### ${path.replace(/\d+_(\w)(\w+)\.js/i, (_, p1, p2) => p1.toUpperCase() + p2)}\n\n`;
// .replace('_', ' ')
result += h1;

const ls = fs.readdirSync(__dirname);

ls.forEach((currentDirectory) => {
  const isDirectory = fs.lstatSync(currentDirectory).isDirectory();

  if (isDirectory && !/^\./.test(currentDirectory)) {
    result += getH2(currentDirectory)

    const files = fs.readdirSync(currentDirectory);

    files.forEach((currentFileName) => {
      const currentPath = path.resolve(__dirname, currentDirectory, currentFileName);
      const data = fs.readFileSync(currentPath, 'utf8');

      result += getH3(currentFileName) + formatToCodeMD(removeComments(data)) + '\n';
    })
  }

});

// let currentDirectory = '1 creational';
// let currentFileName = '1_constructor.js';
// let currentPath = path.resolve(__dirname, currentDirectory, currentFileName);

// const data = fs.readFileSync(currentPath, 'utf8');

// result += getH3(currentFileName) + formatToCodeMD(removeComments(data));

// console.log();
// console.log(fs.lstatSync(__dirname).isDirectory())

fs.writeFileSync('README.md', result, 'utf8');
