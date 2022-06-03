import React, { Component} from 'react'
import { Services } from './Services';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import './Toast.css'
import UploadPrescription from './UploadPrescriptionPage';
import OrderPage from './OrderPage';
import { Link } from 'react-router-dom';


let baseURL = `https://cmschamps.com/pharma-app/`;
let cartData = JSON.parse(localStorage.getItem(`cartData`));


class CartPage extends Component {
    constructor(props) {
        super(props);
    }
    state = { 

      checkbox1: false,
      totalPrice: 0,
      prescriptionImage: '',
      cartData: cartData,
      checkOutData: [],
      duplicatesCheckout: [],
      loopStatus: 0,
      loopStatus1: 0,
      finalProductsData: [],
      discount: 0,
      actualMRP:0,


     }


handleChange = (e) =>{
console.log(e.target.value)
this.setState({ checkbox1 : e.target.checked });
}

homePage = () =>{
  window.open("/home", "_self");
}


removeItemFromcart = (item) =>{
console.log(item);
cartData.splice(item,1);
console.log(cartData)
this.setState({
  cartData: cartData
})
localStorage.setItem(`cartData`, JSON.stringify(this.state.cartData));
}


onButtonClick = (productDetails, type, position) =>{
  let cartData = this.state.cartData;
  cartData =  cartData.map((s, index) => {
    if(type === 'inc') {
      if(s.id === productDetails.id && index === position) s.qty+=1;
      return s; 
    }
    else if(type === 'dec' && productDetails.qty > 1)  {
      if(s.id === productDetails.id && index === position) s.qty-=1; 
      return s;
    } else return s;
    
    
  })
  this.setState ({
    cartData
  })

    console.log(this.state.cartData);
    this.checkoutButton();
  }


setCheckOutData = (productData, position) =>{
console.log("position"+position)
if(document.getElementById(productData.id).checked === true)
    {
      for(let i = 0 ; i<this.state.cartData.length; i++) {
        if(i === position){
          if(productData.id === this.state.cartData[i].id) {      
          this.state.checkOutData.push(this.state.cartData[i]);
        }
        
      }
    }
    this.checkoutButton();

    
    }
else if(document.getElementById(productData.id).checked === false) {
      
      for(let i = 0 ; i<this.state.checkOutData.length; i++) {
        if(productData.name === this.state.checkOutData[i].name) {
          this.state.checkOutData.splice(i,1)
        }       
      }
      this.checkoutButton();
 
    }
      
  }

  checkoutButton = () =>{
    const obj =[];
    let pr = 0;
    let discount1 = 0;
    let actualMRP1 = 0;

    if(this.state.checkOutData.length <= 0){
      this.setState ({
        totalPrice : 0
      })
     
    }

    for(let i=0; i<this.state.checkOutData.length; i++){    
      pr = pr + this.state.checkOutData[i].actual_price * this.state.checkOutData[i].qty;
      actualMRP1 = actualMRP1 + this.state.checkOutData[i].price * this.state.checkOutData[i].qty;
      discount1 = discount1 + (this.state.checkOutData[i].price - this.state.checkOutData[i].actual_price)*this.state.checkOutData[i].qty;


      obj.push({
        id: this.state.checkOutData[i].id, 
        name: this.state.checkOutData[i].name, 
        qty:this.state.checkOutData[i].qty, 
        price:this.state.checkOutData[i].actual_price,
        image: this.state.checkOutData[i].image,
      })
      
      this.setState ({
        totalPrice : pr,
        finalProductsData: obj,
        discount: discount1,
        actualMRP: actualMRP1,
      })

    }
  }



semiBooking = (productsData) =>{
  if(productsData.length < 1 ){
    toast.error("Please Select any product and try again !!!")
  }
console.log(productsData)
this.state.loopStatus = 0;
this.state.loopStatus1 = 0;
  for(let i =0; i<productsData.length; i++){
      if(productsData[i].prescription_required === "1"){
            console.log("hj")
            if(productsData[i].prescriptionImage === ""){
              this.state.loopStatus = this.state.loopStatus+=1;
              toast.error("Upload prescription for "+ productsData[i].name)                  
            }
            else{
              this.state.loopStatus1 = this.state.loopStatus1+=1;
            }               
          }    
  }
console.log("required"+ this.state.loopStatus)
console.log("uploaded"+ this.state.loopStatus1)

if( productsData.length>=1 && this.state.loopStatus === 0) {
  localStorage.setItem(`amount`, this.state.totalPrice)
  const login = JSON.parse(localStorage.getItem('login'));
      if(!login){
      window.open("/login", "_self");   
      }
      else{
        this.props.history.push({
            pathname: '/orderpage',
            state: this.state.finalProductsData, // your data array of objects
            finaldiscount: this.state.discount,
            finalMRP: this.state.actualMRP,
        })

      }
}
}


handleSetImage = (event) =>{

  const login = JSON.parse(localStorage.getItem('login'));
      if(!login){
      window.open("/login", "_self")
      }
      else{
        const id = event.currentTarget.getAttribute("data-value");
        console.log(id)
        if(id === event.target.id) {
      
        let image = event.target.files[0];
        console.log(event.target.files[0])
      
      
      
        this.setState({
            imageName : event.target.files[0].name,
        })
      
        let formData = new FormData();    //formdata object
      
        formData.append('image', event.target.files[0] );   //append the values with key, value paid
        formData.append('user_id', login.id);
        formData.append('product_id', event.target.id)

        
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post( baseURL + `api/products/upload_prescription`, formData, config)
            .then(response => {
                console.log(response);
                this.setState({
                    prescriptionImage: response.data.products.image,
                })
      
                let cartData = this.state.cartData;
                cartData =  cartData.map(s => {
                  
                    if(s.id === event.target.id) {
                      s.prescriptionImage =response.data.products.image;
                    }
                    return s;        
                })
                this.setState ({
                  cartData
                })
              
                  console.log(this.state.cartData);
      
            })
            .catch(error => {
                console.log(error);
            }); 
      
          }
      }

  

}


    render() 
    { 

      const {prescriptionImage, cartData } = this.state;

        return ( 
            <div className="login_page create_page supplement_page medicine_page">
              <ToastContainer />
            <div className="login_details">
              <div className="med-header">
                  <h2 onClick={this.homePage}>Cart</h2>
                  {/* <a href="#"><i className="fa-solid fa-trash-can"></i></a> */}
              </div> 
                    <div className="space">
                      <div className="container">          

                    {cartData && cartData.length >0 ? cartData.map((selectedProducts, index) => {
                        
                        return (
                          
                          <div className="cartpage-products" key={index}>
                            <div className="stores-location medicine-details">
                            <div className="med_loc">
                            <div className="round">
                              <input type="checkbox" id={selectedProducts.id}  value = {selectedProducts.id} onChange={this.handleChange} onClick={ ()=> this.setCheckOutData(selectedProducts, index) } />
                              <label for="checkbox"></label>
                            </div>
                            <div className="med-img">
                              <img  src={selectedProducts.image} />
                            </div>
                            <div className="med-info" >
                              <h6 > {selectedProducts.name} <span></span></h6>
                              <p > Rs {parseFloat(selectedProducts.actual_price).toFixed(2)} x {selectedProducts.qty} </p>
                              <small > Rs  {parseFloat(selectedProducts.actual_price * selectedProducts.qty).toFixed(2)}</small>
                            </div>
                            <div className='cart-delete-btn'> 
                            <a onClick={()=>this.removeItemFromcart(index)}><i className="fa-solid fa-trash-can"></i></a>
                            </div>
                            <div className="add_btns">
                              <button   data-value={selectedProducts.id}  onClick= {()=> this.onButtonClick(selectedProducts,'dec', index)}>−</button>
                              <input  type="number"  value={selectedProducts.qty}   />
                              <button  onClick= {()=> this.onButtonClick(selectedProducts,'inc', index)}  >+</button>
                            </div>
                          </div>

                          {selectedProducts.prescription_required && selectedProducts.prescription_required === "1" ?
                          
                          <div className="upload-btn" id = "prescription-button">
                              <strong > Document is required to purchase this product</strong>
                              <div className='upload_file'>
                              <img  src={ baseURL + selectedProducts.prescriptionImage} id=""/>
                            {/* <p>{selectedProducts.prescriptionImageName}</p> */}
                              <button className="up-btn" >Upload a file</button>
                              <input   type="file" name="myfile" data-value={selectedProducts.id} id={selectedProducts.id} onChange={this.handleSetImage} />
                            </div>
                          </div>

                        : null }
                          
                        </div>
                        </div>
                        
                        )

                    }) : 


                      <div className='empty-cart-parent'> 
                        <div className='empty-cart-div'>
                         <img src="emptycart.png"></img>
                         <p>Your cart is empty</p>
                        </div>
                      </div>
                      
                      
                      }   
                      </div> 

                      <div className="Store_footer">
                        <div className="bill_1">
                          <p>Total : <span>Rs. {parseFloat(this.state.totalPrice).toFixed(2)}</span></p>
                        </div>
                        <div className="bill_2">
                          <a onClick={()=>this.semiBooking(this.state.checkOutData)}>CHECK OUT</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
          );
    }
}
 
export default CartPage;