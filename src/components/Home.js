import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import PopularRestaurants from "./PopularRestaurants";
import Location from "./Location";

function Home(props) {

    const [location, setLocationCoordinates] = useState({lat:"22.8045665",lng:"86.2028754"})

    console.log("in home",location)

  return (
    <div className="row">
      <div
        className="col-2">
        <Location setLocationCoordinates= {setLocationCoordinates}/>
      </div>
      <div
        className="col-10">
            <PopularRestaurants location={location}/>
      </div>
    </div>
  );
}

export default Home;
