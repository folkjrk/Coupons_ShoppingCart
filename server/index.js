const express = require('express')
const app = express()
const ProductModels = require('./models/product.js')
const CouponModels = require('./models/coupon.js')
const port = 3004
const cors = require('cors');

// Middleware
app.use(cors({
  origin: "http://localhost:5181", // Corrected origin URL // need to change to actual port
  methods: ["GET", "POST"], 
}));
app.use(express.json());

//routes
app.listen(port, ()=>{
  console.log('Sever is running')
})

app.post('/', (req, res) => {
  res.send("Node API server Updated")
});

app.get('/products', (req, res) => {
    const productJson = ProductModels.readProductFile();
    if (productJson) {
      console.log(productJson);
      res.send(productJson);
    } else {
      res.status(500).json({error: 'Error reading products data'});
    }
  });

  app.get('/coupons', (req, res) => {
    const couponJson = CouponModels.readCouponFile();
    if (couponJson) {
      console.log(couponJson);
      res.send(couponJson);
    } else {
      res.status(500).json({error: 'Error reading coupons data'});
    }
  });