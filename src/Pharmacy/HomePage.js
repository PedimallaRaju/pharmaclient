import React, { Component, useCallback } from 'react'
import { Services } from './Services';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import './Toast.css'
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import { ChangeEvent } from 'react';
import StoreProducts from './StoreProducts';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';


let resultArr;
const stores = JSON.parse(localStorage.getItem('stores'));
if(!stores){
  console.log("No Stores");
}
else{
  console.log("Stores Exist");
  resultArr = JSON.parse(localStorage.getItem('stores'));
}






class HomePage extends Component {
constructor(props) {
    super(props);
    this.state = {
      address: '' ,
      latLng: '' ,
      stores: {} ,
      res:{},
      resultArr: resultArr,
     
    }

  }

  stores ={};
  
  



componentDidMount () {
                      if ("geolocation" in navigator) {
                        console.log("Available");
                        navigator.geolocation.getCurrentPosition(function(position) {
                          console.log("Latitude is :", position.coords.latitude);
                          console.log("Longitude is :", position.coords.longitude);

                          const obj = {
                            lon: position.coords.longitude,
                            lat : position.coords.latitude,
                          }
                          console.log(obj);
                         
                          Services.getInstance().getAllNearByStores(obj).then((result) => {
                            console.log('result from API ====>', result.data)
                            
                            if(result.status === false)
                                {
                                  var spinner = document.getElementById('spinner');
                                  if(spinner.style.display == "block"){
                                    spinner.style.display = "none";
                                  }
                                  toast.error(result.msg);
                                }
                            else if(result.status === true)
                                {
                                  var spinner = document.getElementById('spinner');
                                  if(spinner.style.display == "block"){
                                    spinner.style.display = "none";
                                  }
                                  this.setState({resultArr: result.data});
                                  localStorage.setItem(`stores`,JSON.stringify(result.data));
                                     
                                }
                            else {
                              toast.error("Request Could Not Send");
                            }
                                
                           
                        });
                      
                        });
                      
                      
                      } else {
                        toast.error("Please Turn GPS On");

                      }
                      }


handleSelect = address => {
                        geocodeByAddress(address)
                          .then(results =>  getLatLng(results[0]) )
                          .then(latLng =>  this.setState({ latLng: latLng }))
                          .catch(error => console.error('Error', error));
                          console.log(address)
                          this.setState({ address });
                          var n = document.getElementById("storefooter");
                          n.style.display = "flex";
   
   
                            };



 
handleChange = address => {
                          this.setState({ address });
                          var n = document.getElementById("storefooter");
                          n.style.display = "none";

                          if(address === ""){
                            var n = document.getElementById("storefooter");
                            n.style.display = "flex";
                          }
                      };

getCurrentLocation =()=>{
                         var spinner = document.getElementById('spinner');
                         spinner.style.display = "block"

                          if ("geolocation" in navigator) {
                            console.log("Available");
                            navigator.geolocation.getCurrentPosition(function(position) {
                              console.log("Latitude is :", position.coords.latitude);
                              console.log("Longitude is :", position.coords.longitude);

                              const obj = {
                                lon: position.coords.longitude,
                                lat : position.coords.latitude,
                              }
                              console.log(obj)

                              Services.getInstance().getAllNearByStores(obj).then((result) => {
                                console.log('result from API ====>', result)
    
                                if(result.status === false)
                                {
                                  var spinner = document.getElementById('spinner');
                                  if(spinner.style.display == "block"){
                                    spinner.style.display = "none";
                                  }
                                  toast.error(result.msg);
                                }
                            else if(result.status === true)
                                {
                                  var spinner = document.getElementById('spinner');
                                  if(spinner.style.display == "block"){
                                    spinner.style.display = "none";
                                  }
                                  this.setState({resultArr: result.data});
                                  localStorage.setItem(`stores`,JSON.stringify(result.data));
                                     
                                }
                            else {
                              toast.error("Request Could Not Send");
                            }
                            
                            });
                            });
                          }
                          else {
                            console.log("not available")
                            toast.error("Please Turn GPS On");

                          }
                        }
                        
search = () => {

                  var spinner = document.getElementById('spinner');
                  spinner.style.display = "block"
                  console.log(JSON.stringify(this.state.latLng))
          
                    const obj = {
                                lon: this.state.latLng.lng,
                                lat : this.state.latLng.lat,
                                }

                                  Services.getInstance().getAllNearByStores(obj).then((result) => {
                                    console.log('result from API ====>', result)
        
                                    if(result.status === false)
                                    {
                                      var spinner = document.getElementById('spinner');
                                      if(spinner.style.display == "block"){
                                        spinner.style.display = "none";
                                      }
                                      var n = document.getElementById("storefooter");
                                      n.style.display = "flex";
        
                                      toast.error(result.msg);
                                    }
                                else if(result.status === true)
                                    {
                                      var spinner = document.getElementById('spinner');
                                      if(spinner.style.display == "block"){
                                        spinner.style.display = "none";
                                      }
                                      var n = document.getElementById("storefooter");
                                      n.style.display = "flex";
        
                                      this.setState({resultArr: result.data});
                                      localStorage.setItem(`stores`,JSON.stringify(result.data));
                                      console.log(this.state.resultArr)
                                         
                                    }
                                else {
                                  var spinner = document.getElementById('spinner');
                                      if(spinner.style.display == "block"){
                                        spinner.style.display = "none";
                                      }
                                      var n = document.getElementById("storefooter");
                                      n.style.display = "flex";
                                  toast.error("Select location and search again");
                                }
                                
                                });

              }

getStoreAllProducts = (e) =>{
                        document.getElementById('spinner').style.display = "block";
                        const id = e.currentTarget.getAttribute("data-value")
                        localStorage.setItem(`storeID`, id);

                        const obj = {
                          store:id
                        }
                        Services.getInstance().getStoreProducts(obj).then((result) => {
                          console.log('result from API ====>', result)
                          if(result.status === true) {
                                localStorage.setItem(`productsData`,JSON.stringify(result.data));
                                window.open("/storeproducts","_self");
                          }
                          else {
                                toast.error("No products available")
                                document.getElementById('spinner').style.display = "none";

                          }

                        });

}

onClickCaptureMethod = () =>{
                var n = document.getElementById("storefooter");
                  n.style.display = "flex";
}


  render() {
      let {stores, resultArr} = this.state;

  return (
      <div className="st-location_page">
      <div className="container">
        <StoreHeader />

        <div className="loc-path">
          <div className='g-map'>
             <p>Select Location</p>
            <span onClick={this.getCurrentLocation}><i className="fa-solid fa-location-crosshairs"></i>Use Current Location</span>
          </div>
          <ToastContainer/>
          <div className="loader" id='spinner'>
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
        </div>
         <div>
            <PlacesAutocomplete
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                  value={this.state.address}  >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
               <div>
                  <div className='st_input'>
                      <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}


                      />

                      <button onClick={()=> this.search()}>
                        Search
                      </button>
                  </div>
                  <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {

               
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: 'transparent', cursor: 'pointer',display:'block',borderRadius:'4px',border:'1px solid #616161',padding:'5px'};
                            return (
                              <div
                              key = {suggestion?.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          }) }
                  </div>
                </div>
                )}
              </PlacesAutocomplete>
       </div>
        </div>
        <div>
        <div className='stores-location'  onClickCapture={this.onClickCaptureMethod} >
       
          <div >

        {resultArr && resultArr.length >= 0 ? resultArr.map((userinfo) =>
          {  
                                  return (

                                    

                                         <div  id="storeId" className="med_loc" key={userinfo?.id} data-value={userinfo.id} onClick={this.getStoreAllProducts}>
                                            <div className="med-img">
                                              <img src={userinfo.logo} />
                                            </div>
                                            <div className="med-info" >
                                              <h6>{userinfo.name}</h6>
                                              <span>{userinfo.owner}</span>
                                              <address>{userinfo.address}</address>
                                            </div>
                                            <p className="kilometre"><i className="fa-solid fa-location-crosshairs"></i> {parseFloat(userinfo.distance).toFixed(2)} Km</p>
                                          </div>
                                   
                                           
                                     

                                  )
                                 
                              })  :  
                              
                              
                              <div className='no-stores-parent'> 
                              <div className='empty-cart-div'>
                               <img src="emptycart.png"></img>
                               <p>No stores availabe near to you</p>
                              </div>
                              </div> 
                            
                            }

                       </div>

                          </div>

       
                          </div>
       
       <StoreFooter />

      </div>
    </div>
    )
  }
}

export default HomePage;