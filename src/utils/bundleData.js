const fs = require('fs');
const path = require('path');
const glob = require('glob');

const src = path.resolve('./src');
let pugData = {};

glob.sync(path.resolve(src, './blocks/**/**/data.js')).forEach((path) => {
  const data_file = fs.readFileSync(path).toString();
  eval(data_file);
  pugData = {...pugData, ...data};
});

const pages_path = path.resolve(src, 'pages');
let __pages = [];

fs.readdirSync(pages_path).forEach((fullName) => {
  const ext = path.extname(fullName);

  if (ext === '.pug') {
    const name = fullName.slice(0, -ext.length);

    __pages.push({
      href: `${name}.html`,
      name
    })
  }
});

const icon_path = path.resolve(src, 'svg');
let __svgIcon = [];

fs.readdirSync(icon_path).forEach((fullName) => {
  const ext = path.extname(fullName);

  if (ext === '.svg') {
    const name = fullName.slice(0, -ext.length);

    __svgIcon.push({
      name
    })
  }
});

pugData = {...pugData, ...{__pages}, ...{__svgIcon}};

module.exports = pugData;
