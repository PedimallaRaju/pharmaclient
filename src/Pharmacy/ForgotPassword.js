// import React, { Component } from 'react'

// export class ForgotPassword extends Component {

//     state = {
//         lat:'',
//         long:''
//     }

//     componentDidMount() {
//         if ("geolocation" in navigator) {
//           console.log("Available");
//           navigator.geolocation.getCurrentPosition(function(position) {
//             console.log("Latitude is :", position.coords.latitude);
//             console.log("Longitude is :", position.coords.longitude);
            
            
//           });

          
//         } else {
//           console.log("not available")
//         }
//       }

    
//   render() {
//       const {lat, long} = this.state;
//     return (
//         <div>
//       <div onClick={this.locate}>ForgotPassword</div>
//       <div>
//             {this.state.lat}
//       </div>
//       </div>
     
     
//     )
//   }
// }

// export default ForgotPassword






import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '' ,
      latLng:'',
    };
  }
 
  handleChange = address => {
    this.setState({ address });
    
  };

  search = () =>{
    console.log(this.state.latLng)
    console.log(JSON.stringify(this.state.latLng))
  }
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results =>  getLatLng(results[0]) )
      .then(latLng =>  this.setState({ latLng: latLng }))
      .catch(error => console.error('Error', error));
      console.log(address)
      this.setState({ address });
     
      
  };

      componentDidMount() {
        if ("geolocation" in navigator) {
          console.log("Available");
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            const obj = {
              lat : position.coords.latitude,
              lang: position.coords.longitude,
            }
            console.log(obj)


           
            
          });

          
        } else {
          console.log("not available")
        }
      }

  
 
  render() {
    return (
      <PlacesAutocomplete
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        value={this.state.address}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}


            />

            <button onClick={this.search}>
              Search
            </button>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
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
    );
  }
}

export default ForgotPassword