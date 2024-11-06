import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SearchRestaurant(props) {

    const [restaurantName, setRestaurantName] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [moreRestaurants, setMoreRestaurants]  = useState([])

    useEffect(() => {
        axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.8045665&lng=86.2028754&str=${restaurantName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=de0f8a9e-6b5d-906e-952f-55c3fb7d3893`)
        .then(res =>{ 
            //if(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT)
            setRestaurants(res?.data?.data)
            setMoreRestaurants(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card.card.restaurants)
        }
           
        )
    },[restaurantName])

    console.log(restaurants);
    
    return (
        <>
       
        <div style={{textAlign:"center"}}>
            <h2>Search Restaurant</h2>
            <input type="text" placeholder='enter restaurant' value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)}/>
        </div>
        <div class="row row-cols-1 row-cols-lg-4 g-4" id="popular_restaurant">
            {moreRestaurants?.length > 0 && moreRestaurants.map((item,i) => {
                return (<Link to={`/menu/${item?.info?.name}/${item?.info?.id}`}><div class="col">
                    <div class="card h-100">
                      <img style={{height:"200px"}} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`} class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{item?.info?.name}</h5>
                        <p><i class="bi bi-star-fill"><span> </span></i>{item?.info?.avgRating ? item?.info?.avgRating : item?.info?.avgRatingString}<span> </span><i class="bi bi-bicycle"></i> {item?.info?.sla?.slaString}</p>
                        <p>{item?.info?.cuisines?.join(",")}</p>
                        <h6 class="card-title">{item?.info?.areaName}</h6>
                        <p class="card-text">
                         
                        </p>
                      </div>
                    </div>
                  </div></Link>)
            })}
        </div>
        </>
    );
}

export default SearchRestaurant;