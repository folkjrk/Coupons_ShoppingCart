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


// const mongoose = require('mongoose')

// const ProductSchema = mongoose.Schema(
//     {
//         id: {
//             type: String,
//             required: true
//         },
//         name: {
//             type: String,
//             required: true
//         },
//         description: {
//             type: String,
//         },
//         categories: {
//             type: Number,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         quantity: {
//             type: Number,
//             default: 100,
//         }
//     },
//     {
//         timestamps: true,
//     }
// )
// const Product = mongoose.model("Product", ProductSchema);

// export default Product;