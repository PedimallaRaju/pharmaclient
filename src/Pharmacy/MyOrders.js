import React, { Component, useCallback } from 'react'
import { Services } from './Services';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import './Toast.css'
import StoreFooter from './StoreFooter';
import StoreHeader from './StoreHeader';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';




const login =  JSON.parse(localStorage.getItem('login'));
const ordersData = JSON.parse(localStorage.getItem('myorders'));

class MyOrdersPage extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
     indOrderProducts: [],
     ordersData: ordersData,
     }

orderedProducts = (productData, position) =>{
  document.getElementById('spinner').style.display = "block";
    const obj = {
      order_id: productData.id
    }

    Services.getInstance().orderIdProducts(obj).then((result) => {
      console.log('result from API ====>', result)
      if(result.status === true) {

        console.log(result.data)
        for(let i=0; i<result.data.length; i++){
          this.setState({
            indOrderProducts: result.data,
          })
        }
        this.props.history.push({
          pathname: '/orderstatus',
          state: result.data, // your data array of objects
          status: productData.status,
          
      }) 
      }
      else {
        console.log("No products Data")
      }
  
    });
}

handleOnSearch = (string, results) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
  console.log(string, results)
  this.setState({
    ordersData: results
  })
  if(string === ''){
    this.setState({
      ordersData: ordersData
    })
  }
}

handleOnHover = (result) => {
  // the item hovered
  console.log(result)
  this.setState({
    ordersData: result
  })

  
}

handleOnSelect = (item) => {
  // the item selected
  console.log(item)
  this.setState({
    ordersData: [item]
  })
}

handleOnFocus = () => {
  console.log('Focused')
}


homePage = () =>{
  this.props.history.push({
    pathname: '/home',
}) 
}


    render() { 
        return ( 
            <div class="login_page create_page supplement_page ssp-page smyorder-page">
            <div class="login_details">
            <div class="med-header">
            <h2 onClick={this.homePage} > My Orders</h2>
            </div>
            <ToastContainer />
            <div className="loader" id='spinner'>
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
              <div className="space">
              <div class="container">
              {/* <div className="prod-search" >
                  <ReactSearchAutocomplete
                    items={ordersData}
                    onSearch={this.handleOnSearch}
                    onHover={this.handleOnHover}
                    onSelect={this.handleOnSelect}
                    onFocus={this.handleOnFocus}
                    autoFocus
                  />
                </div> */}
                <div style={{paddingTop:"45px"}}></div>
                <div class="stores-location medicine-details" >
              
                  {this.state.ordersData && this.state.ordersData.length >=0 ? this.state.ordersData.map((products, index)=>{
                return(
                  <div className='or-prod'  key={index}>
                          <div class="med_loc"  >
                            <div class="med-img">
                              <img src="shopping-bag.png" />
                            </div>
                            <div class="med-info" key={index} onClick={()=>this.orderedProducts(products, index)} >
                              <h6> Order Id: <span> {products.order_id}</span></h6>
                              {/* <p>Payment: {products.payment_mode}</p> */}
                              <small> Price: <span> ₹.{products.amount}</span> </small>
                              <p>Purchased on {new Date(products.created_at).toString().substring(4, 15)}</p>
                              {/* <p> Status:  {products.status}</p> */}
                              <p>Expected Delivery </p>
                            </div>
                          </div>
                          <div>
                          </div>
                  </div>
           )
          }) :   <div className='empty-cart-parent'> 
                  <div className='empty-cart-div'>
                  <img src="emptycart.png"></img>
                  <p>No Orders found</p>
                  </div>
                </div> 
        }

        </div>
                <StoreFooter />
              </div>
      
              </div>
            </div>
            
          </div>
         );
    }
}
 
export default MyOrdersPage;