let fs = require('fs');
let path = require('path');

function readCouponFile() {
  try {
    let filePath = path.join(__dirname, '../data/coupon.json');
    let data = fs.readFileSync(filePath);
    let coupon = JSON.parse(data);
    return coupon;
  } catch (err) {
    console.log('Error reading JSON file:', err);
    return null;
  }
}

module.exports = {
  readCouponFile: readCouponFile
};