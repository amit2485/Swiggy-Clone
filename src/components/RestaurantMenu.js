import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../App.css"

function RestaurantMenu(props) {

    const {id,restaurantName} = useParams()  
    const [restaurantMenu, setRestaurantMenu] = useState([])


    useEffect(() => {
        axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.8045665&lng=86.2028754&restaurantId=${id}`)
        .then(res => setRestaurantMenu(res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.splice(2))
        )
    },[])

    console.log(restaurantMenu);
    
      
    return (
        <div className='container' style={{zIndex:1}}>
            <h1>Restaurant Menu</h1>
            <div class="accordion accordion-flush" id="accordionFlushExample">
                {restaurantMenu.map((item,index) => {
                    if(item?.card?.card?.itemCards)
                    return (<div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                          <b>{item?.card?.card?.title} ({item?.card?.card?.itemCards.length})</b> 
                        </button>
                        </h2>
                        <div id={`flush-collapseOne${index}`} class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                           
                                {item?.card?.card?.itemCards.map((item,i) => {
                                    return(<div class="card mb-3" style={{maxWidth:"1000px",border:"0px"}}>
                                        <div class="row g-0">
                                          
                                          <div class="col-md-10">
                                            <div class="card-body">
                                            <i class="bi bi-caret-up-square-fill" style={{color: `${item?.card?.info?.itemAttribute?.vegClassifier == "NONVEG" ? "red" : "green"}`}}></i>
                                              <h5 class="card-title">{item?.card?.info?.name}</h5>
                                              <h5 class="card-title"><i class="bi bi-currency-rupee"></i>{(item?.card?.info?.defaultPrice ? item?.card?.info?.defaultPrice : item?.card?.info?.price)/100}</h5>
                                              <p class="card-text">{item?.card?.info?.description}</p>
                                              <button className='btn btn-success'>Add to Cart</button>
                                            </div>
                                          </div>
                                          <div class="col-md-2">
                                            {item?.card?.info?.imageId ? <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.info?.imageId}`} class="img-fluid rounded-start" alt="..." style={{width:"100%",height:"80%",borderRadius:"5px"}}/> :
                                             <img src={`https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.webp?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=`} class="img-fluid rounded-start" alt="..." style={{width:"100%",height:"80%",borderRadius:"5px"}}/>}
                                            
                                          </div>
                                        </div>
                                        <hr />
                                      </div>
                                      )
                                })}
                            

                        </div>
                        
                        </div>
                    </div>)
                })}
                
            </div>
    </div>
    );
}

export default RestaurantMenu;