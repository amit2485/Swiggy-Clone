import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Location({setLocationCoordinates}) {

    const [location, setLocation] = useState([])
    const [searchedLocation, setSearchedLocation] = useState([])
    const [description, setDescription] = useState([])
    
    useEffect(() => {

        axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${location}`)
        .then(res => {
           //setDescription(res.data.data[0].description.split(","));
            
            if(res.data.data)
            setSearchedLocation(res.data.data)}
        )

    },[location])

    let getLatititudeLongitude = (placeId) => {
        setSearchedLocation([])
        
        axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`)
        .then(res => setLocationCoordinates(res.data.data[0].geometry.location)
        )

    }
    return (
        <div style={{textAlign:"center",margin:"30px 0px"}}>
            <h5>Search Location</h5>
            <input type="text" style={{margin:"0px 0px 10px 30px "}} placeholder='search location' value={location} onChange={(e) => setLocation(e.target.value)}/>
            <ul style={{listStyleType:"none",textAlign:"center"}}>
                {location !="" && searchedLocation?.map((item,i) => {
                    return <li className='list-li' style={{fontSize:"12px",lineHeight:"8px",textAlign:"center"}} onClick={() => getLatititudeLongitude(item.place_id)}>
                        <p style={{textWrap:"nowrap"}}>{item.description.split(",")[0]}</p>
                        <p style={{textWrap:"nowrap"}}>{item.description.split(",")[1]},{item.description.split(",")[2]}</p>
                        <hr />
                        </li>
                })}
            </ul>
        </div>
    );
}

export default Location;