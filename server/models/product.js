let fs = require('fs');
let path = require('path');

function readProductFile() {
  try {
    let filePath = path.join(__dirname, '../data/product.json');
    let data = fs.readFileSync(filePath);
    let product = JSON.parse(data);
    return product;
  } catch (err) {
    console.log('Error reading JSON file:', err);
    return null;
  }
}

module.exports = {
  readProductFile: readProductFile
};
