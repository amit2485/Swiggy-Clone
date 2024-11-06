
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import RestaurantMenu from './components/RestaurantMenu';
import SearchRestaurant from './SearchRestaurant';


function App() {
  return (
   
    <BrowserRouter>
    <Header/>
    <div style={{marginTop:"120px"}}>

    </div>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/menu/:restaurantName/:id"  element={<RestaurantMenu/>}/>
      <Route path="/searchRestaurant"  element={<SearchRestaurant/>}/>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
