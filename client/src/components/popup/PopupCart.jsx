import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectedProducts } from '../../SelectedProductsContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseIcon from '@mui/icons-material/Close';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PopupCart.css';
import { toast } from 'react-toastify';


function PopupCart({ trigger, setTrigger }) {
  const handleClose = () => setTrigger(false);
  const [coupons, setCoupons] = useState([]); // to show list of coupons
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const { selectedProducts, setSelectedProducts } = useSelectedProducts(); 
  const [totalPrice, setTotalPrice] = useState(0);

  const getCoupons = async () => {
    try {
      // API get coupons
      const response = await axios.get('http://localhost:3004/coupons/');
      console.log(response.data);
      setCoupons(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCouponChange = (e) => {
    try {
      const selectedId = e.target.value;
      const selectedCoupon = coupons.find((coupon) => coupon.id === selectedId);

      if (selectedCoupon) {
        const isAlreadySelected = selectedCoupons.some((coupon) => coupon.id === selectedId);

        // Check if a coupon with the same category is already selected
        const hasSameCategory = selectedCoupons.some((coupon) => {
          const couponData = coupons.find((c) => c.id === coupon.id);
          return couponData && couponData.categories === selectedCoupon.categories;
        });

        if (!isAlreadySelected && !hasSameCategory) {
          setSelectedCoupons((prevSelected) => [...prevSelected, selectedCoupon]);
          toast.success(`Coupon successfully added!`, { className: 'toast-message' });
        } else if (isAlreadySelected) {
          toast.error(`You've already added this coupon.`, { className: 'toast-message' });
        } else if (hasSameCategory) {
          toast.error(`You can't add a coupon from the same category.`, { className: 'toast-message' });
        }
      }
    } catch (err) {
      console.log('Error handling coupon:', err);
    }
  };

  const calculateTotalPrice = (selectedProducts, selectedCoupons) => {
  
  try{
    let totalPrice = 0;
    
    for (const product of selectedProducts) {
      totalPrice += product.actualPrice * product.productQuantity;
  }

    const sortedCoupons = selectedCoupons.sort((a, b) => {
      const order = {
        "Coupon": 0,
        "On Top": 1,
        "Seasonal": 2
      };
      return order[a.categories] - order[b.categories];
    });

    // Apply coupon discounts
    for (const coupon of selectedCoupons) {
      if (coupon) {
        switch (coupon.campaigns) {
          case "Fixed amount":
            totalPrice -= coupon.discount;
            break;
          case "Percentage discount":
            totalPrice -= totalPrice * (coupon.discount / 100);
            break;
          case "Percentage discount by item category":
            const categoryProducts = selectedProducts.filter(
              (product) => coupon.categoriesProduct.includes(product.productCategories)
            );
            const categoryTotalPrice = categoryProducts.reduce(
              (total, product) => total + product.price ,
              0
            );
            totalPrice -= categoryTotalPrice * (coupon.discount / 100);
            break;
          case "Discount by points":
            const pointsDiscount = Math.min(coupon.discount, totalPrice * (coupon.capped/100));
            totalPrice -= pointsDiscount;
            break;
          case "Special campaigns":
            const every = coupon.every;
            const discount = coupon.discount;
            const numTimesDiscount = Math.floor(totalPrice / every);
            const specialDiscount = numTimesDiscount * discount;
            totalPrice -= specialDiscount;
            break;
          default:
            break;
        }
      }
    }
  
    return totalPrice;
  }
  catch (error) {
    console.error("An error occurred:", error);
    return -1;
  }

  };

  useEffect(() => {
    console.log('Selected Coupons:', selectedCoupons);
    setTotalPrice(calculateTotalPrice(selectedProducts, selectedCoupons));
    getCoupons();
  }, [selectedCoupons, selectedProducts]);

  const removeSelectedCoupon = (couponId) => {
    setSelectedCoupons((prevSelected) => prevSelected.filter((coupon) => coupon.id !== couponId));
  };

  return (
    <Modal show={trigger} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Basket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.productQuantity}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-4 col-sm-5">
          <select
            className="form-select"
            id="couponSelect"
            aria-label="Select Coupon"
            onChange={handleCouponChange}
            value={''} // Reset value after selection
          >
            <option value="">Select a Coupon</option>
            {coupons.map((coupon, index) => (
              <option key={index} value={coupon.id}>{coupon.categories}: {coupon.campaigns}</option>
            ))}
          </select>
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          {selectedCoupons.map((coupon, index) => {
            return (
              <div key={index} className='coupon-card'>
                <div className="coupon-close" onClick={() => removeSelectedCoupon(coupon.id)}>
                  <CloseIcon />
                </div>
                <p>{coupon.campaigns}</p>
              </div>
            );
          })}
        </div>
        <hr />
        <div>
          Total Price: {totalPrice.toFixed(2)} THB 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark">
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupCart;
