import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Product from '../components/product/Product';
import './Homepage.css'


function HomePage() {

  return (
    <div className='container-main'>
    <Navbar/>
    <Product className='container-middle'/>
    </div>
  );
}

export default HomePage;
