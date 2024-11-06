import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div id='header'>
            <Link to="/"><img style={{height:"60px"}}src="https://play-lh.googleusercontent.com/4OOU73CI8knF4TByikeCEA1IOj3hb_AyXdV0Y2_XNikAoVan257QCO0ppXK9e3Z1ncY" alt="" /></Link>
            {/* <Link to="/searchRestaurant">Search Restaurant</Link> */}
            <Link to="/">Search Restaurant</Link>
            <Link to="">Search Dishes</Link>
            <b>Cart</b>
        </div>
    );
}

export default Header;