import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Product from '../components/product/Product';
import './Homepage.css'
import Marquee from '../components/marquee/Marquee';


function HomePage() {

  return (
    <div className='container-main'>
    <Marquee/>
    <Navbar/>
    <Product className='container-middle'/>
    </div>
  );
}

export default HomePage;
