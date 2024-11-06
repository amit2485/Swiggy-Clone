import React, { useEffect, useState } from 'react';
import "../App.css";
import axios from "axios";
import ShimmerEffect from '../ShimmerEffect';
import { Link } from 'react-router-dom';
function PopularRestaurants({location}) {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantName,setRestaurantName] = useState("")
    const [filterRestaurants, setFilterRestaurants] = useState([])
    const [title, setTitle] = useState("")

    console.log("length",location.lat);
    

    useEffect(() => {
        setRestaurants([])
      axios
        .get(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        )
        .then((res) =>{
                setRestaurants(
                res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
              )
              setTitle(res?.data?.data?.cards[1]?.card?.card?.header?.title)
        }
          
        );
    }, [location]);

    useEffect(() => {
        let restaurantCopy = [...restaurants]
       let result = restaurantCopy.filter((item,i) => {
        if(item?.info?.name.toLowerCase().includes(restaurantName.toLowerCase()) == true){
            return true;
        }
       })
       setFilterRestaurants(result)
    },[restaurantName])
    return (
        <div>
            <div style={{textAlign:"center"}}>
            <h4 style={{margin:"20px",textAlign:"center"}}>{title}</h4>
            <input type="text" placeholder='search restaurant' value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} disabled={restaurants == undefined ? true : false}/>
            </div>
            {restaurants == undefined ? <div style={{textAlign:"center",marginTop:"100px"}}><h1 >No Items found</h1></div> : ""}
            <div class="row row-cols-1 row-cols-lg-4 g-4" id="popular_restaurant">
    
            
            { restaurants?.length == 0 ? <ShimmerEffect/> : ""}
            {filterRestaurants.length == 0 && restaurantName == "" && restaurants?.length != 0 ? restaurants?.map((item,i) => { 
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
            }):
            filterRestaurants.map((item,i) => {
                return (<div class="col">
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
                  </div>)
            })}
          
         
       
        </div>
        </div>
    );
}

export default PopularRestaurants;