import React, { Component } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Services from "./Services";

let allDeliveryAddressList = JSON.parse(localStorage.getItem(`DeliveryAddress`));
let userData = JSON.parse(localStorage.getItem(`login`));
class OrderPage extends Component {
  constructor(props) {
    super(props);
}
state = {
  allDeliveryAddressList: allDeliveryAddressList,
  name: null,
  address: null,
  city: null,
  pincode: null,
  paymentType: null,
  state: null,
  country: null,
  phoneNumber: null,
  productsData:this.props.location.state,
  finaldiscount: this.props.location.finaldiscount,
  finalMRP: this.props.location.finalMRP,
  arrayPosition: null,


};


  addNewAddress = () =>{
    document.getElementById("update").style.display = "none";
    document.getElementById("savenew").style.display = "block";
    var addressForm = document.getElementById("address-form");
                    if(addressForm.style.display == "block"){
                      addressForm.style.display = "none";
                    }
                    else{
                      addressForm.style.display = "block";
                    }
  }

  selectedAddress = (deliveryAdd) =>{
    console.log(deliveryAdd)
    this.setState({
      name: deliveryAdd.name,
      address: deliveryAdd.address,
      city: deliveryAdd.city,
      pincode: deliveryAdd.pincode,
      country: deliveryAdd.country,
      phoneNumber: deliveryAdd.phoneNumber,
      state: deliveryAdd.state,
    })
  }

  paymentType = (payType) => {
    console.log(payType);
    if(payType === 'COD'){
      console.log("cod");
      this.state.paymentType = payType;
    }
    else{
      console.log("online");
      this.state.paymentType = payType;
    }

    console.log(this.state.paymentType)
    
  }

  placeOrder = () =>{
    document.getElementById('spinner').style.display = "block";
    if(this.state.name == '' || this.state.address == '' || this.state.city == '' || this.state.pincode == '' ) {
      toast.error("Incomplete Address");
      document.getElementById('spinner').style.display = "none";

    }
    else{
                
                if(this.state.paymentType === 'COD'){
                  const obj = {
                  user_id: userData.id,
                  address: this.state.name + " "+this.state.address,
                  city: this.state.city,
                  state: this.state.state,
                  zip: this.state.pincode,
                  country: this.state.country,
                  email: userData.email,
                  phone: this.state.phoneNumber,
                  amount:localStorage.getItem(`amount`),
                  tax: 10.00,
                  discount: parseFloat(this.state.finaldiscount).toFixed(2),
                  payment_mode: "COD",
                  products:this.state.productsData,
                          
              }
              console.log(obj);
                                                    
              Services.getInstance().newOrderPlacing(obj).then((result) => {
                console.log('result from API ====>', result)
                if(result.status === true){
                  this.props.history.push({
                        pathname: '/successorder',
                        state: result.msg, // your data array of objects
                        shipping: this.state.name + " "+this.state.address + " " + this.state.city + " " + this.state.state + " " + this.state.country + " " + this.state.pincode,
                        
                    })  
                }
                else if(result.status === false){
                  toast.error("Order Not Placed !!!")
                  document.getElementById('spinner').style.display = "none";

                }
                else{
                  toast.error("Something went wrong !!! try again");
                  document.getElementById('spinner').style.display = "none";

                }   
            });

              }
              //////// For Online Payments ///////////
              else if(this.state.paymentType === 'Online'){
                console.log("online is not accepted now")
              }
                else{
                  console.log("online is not accepted now")
                  toast.error("Something went wrong !!! Select delivery address and Payment Mode");
                  document.getElementById('spinner').style.display = "none";

                }
  
  }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.name);
    if(this.state.name == null || this.state.address == null || this.state.city == null || this.state.pincode == null ) {
      toast.error("Incomplete Address");
    }
    else{
      let address = {
        name: this.state.name,
        address: this.state.address,
        city: this.state.city,
        pincode: this.state.pincode,
        state: this.state.state,
        country: this.state.country,
        phoneNumber: this.state.phoneNumber
      }
  
      let allDeliveryAddressList1;
      if(allDeliveryAddressList!=null) allDeliveryAddressList1 = allDeliveryAddressList;
      else allDeliveryAddressList1 = [];
      allDeliveryAddressList1.push(address);
      this.setState({
        allDeliveryAddressList: allDeliveryAddressList1
      })
      
      localStorage.setItem(`DeliveryAddress`, JSON.stringify(allDeliveryAddressList1))
      document.getElementById("myForm").reset();
      document.getElementById("address-form").style.display = "none";
     
    }   
  }


  editDelAddress = (address, position) =>{
    console.log(address);
    this.setState({
      arrayPosition: position,
    })
    document.getElementById("savenew").style.display = "none";
    document.getElementById("update").style.display = "block";
    document.getElementById("address-form").style.display = "block";
    document.getElementById("a").value = address.name;
    document.getElementById("b").value = address.phoneNumber;
    document.getElementById("c").value = address.address;
    document.getElementById("d").value = address.city;
    document.getElementById("e").value = address.state;
    document.getElementById("f").value = address.country;
    document.getElementById("g").value = address.pincode;
  
  }

  update = () =>{

    console.log("udeteeee")
    if(this.state.name == '' || this.state.address == '' || this.state.city == '' || this.state.pincode == '' ) {
      toast.error("Incomplete Address");
    }
    else{
      const newState = allDeliveryAddressList.map((obj, index) =>
      index === this.state.position ? 
      { ...obj, 
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        city: this.state.city,
        address: this.state.address,
        state: this.state.state,
        country: this.state.country,
        pincode: this.state.pincode,
       }: obj);
    }
    
  }

  delAddress = (position) =>{
    allDeliveryAddressList.splice(position,1);
    this.setState({
      allDeliveryAddressList: allDeliveryAddressList
    })
    localStorage.setItem(`DeliveryAddress`, JSON.stringify(this.state.allDeliveryAddressList))
    if(allDeliveryAddressList.length <= 0){
      localStorage.removeItem(`DeliveryAddress`);
    }
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };


  backButton = () =>{
    this.props.history.push({
          pathname: '/cartpage',
      })
  }

  render() {
    return (
      <div class="cl-issue login_page create_page supplement_page medicine_page checkout_page">
        <div class="login_details">
          <ToastContainer />
          <div className="loader" id='spinner'>
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
          <div class="head-red">
            <h2 onClick={this.backButton}>Checkout</h2>
          </div>
            <div class="container">
              <div className="ck-page">
                <div className="price-section">
                  <h6>Price Details</h6>
                  <div className="price-inf">
                    <p style={{padding:"0 0 10px"}}>Price ({this.state.productsData.length} items) <span>₹. {parseFloat(this.state.finalMRP).toFixed(2)}</span></p>
                    <p style={{padding:"0 0 10px"}}>Discount <span style={{color:"green"}}>- ₹. {parseFloat(this.state.finaldiscount).toFixed(2)}</span></p>
                    <p style={{padding:"0 0 10px"}}>Delivery Charges<span style={{color:"green"}}>₹. 50</span></p>
                    <p style={{padding:"10px 0 10px", borderTop:"1px solid #cdc9c9" ,borderBottom:"1px solid #cdc9c9" ,fontWeight:"700"}}>Total Amount <span>₹. {parseFloat(this.state.finalMRP - (this.state.finaldiscount) + 50).toFixed(2)}</span></p>
                    <small style={{display:"block" ,fontSize:"15px" ,padding:"10px 0 0" ,color:"green"}}>You will save ₹ {parseFloat(this.state.finaldiscount).toFixed(2)} on this order</small>
                  </div>
                </div>
                <div class="address_info">
                  <div class="add_inf">
                    <h6>Delivery Address</h6>
                    <a onClick={this.addNewAddress}>Add new</a>
                  </div>
                  <div class="customer_address" id="address-form">
                    <form onSubmit={this.handleSubmit} id="myForm"noValidate>
                      <div className="del-parent">
                        <div className="cntl-frm check-form name-mob">
                          <input style={{marginRight:"2.5px"}}
                            name="name"
                            id="a" 
                            placeholder="Name" 
                            required 
                            onChange={this.handleChange}/>
                          <input style={{marginLeft:"2.5px"}}
                            name="phoneNumber"
                            id="b" 
                            placeholder="Mobile" 
                            required 
                            onChange={this.handleChange}/>
                        </div>
                        <div className="check-address cntl-frm">
                          <textarea 
                            type="text"
                            id="c" 
                            name="address" 
                            placeholder="Address or Landmark" 
                            onChange={this.handleChange}/>
                        </div>
                      <div className="del-city check-form cntl-frm">
                        <input style={{marginRight:"5px"}}
                          id="d" 
                          name="city" 
                          placeholder="City" 
                          onChange={this.handleChange}/>
                        <input style={{marginLeft:"2.5px"}}
                          name="state"
                          id="e"  
                          placeholder="State" 
                          required 
                          onChange={this.handleChange}/>
                      </div>
                      <div className="del-city check-form cntl-frm">
                        <input style={{marginRight:"5px"}}
                          name="country"
                          id="f" 
                          placeholder="Country" 
                          required onChange={this.handleChange}/>
                        <input style={{marginLeft:"2.5px"}}
                          name="pincode"
                          id="g" 
                          placeholder="Pincode" 
                          onChange={this.handleChange}/>
                      </div>
                      <button id="savenew" type="submit">Save</button>
                      <button id="update" onClick={this.update}>Update</button>
                    </div>
                    </form>
                  </div>

                  {this.state.allDeliveryAddressList && this.state.allDeliveryAddressList.length>=0 ? this.state.allDeliveryAddressList.map((delData, index)=>{
                    return(
                      <div key={index}>
                        <div onClick={() =>this.selectedAddress(delData) }> 
                          <label class="container-radio ck-ad-inf">
                            <div className="del-ad-head">
                              <b style={{textAlign:"left" ,width:" 100%" ,marginBottom:"8px" ,fontWeight:"bold"}}>
                                {delData.name}
                              </b>
                              <div className="t_dot-menu">
                                 <p><i class="fa-solid fa-ellipsis-vertical"></i></p>
                                 <div className="e-d_btns">
                                   <div className="ed-btn" onClick={()=>this.editDelAddress(delData, index)}>Edit</div>
                                   <div className="ed-btn" onClick={()=>this.delAddress(index)}>Delete</div>
                                 </div>
                              </div>
                            </div>
                           {delData.address + ", "+ delData.city + ", " + delData.state + ", " + delData.country + ", " + delData.pincode}
                            <p style={{textAlign:"left" ,width:" 100%" ,marginTop:"8px" ,fontSize:"15px" ,color:"#000"}}>{delData.phoneNumber}</p>
                            <input type="radio" name="radio1" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>

                    )
                  }) : <div onClick={this.addNewAddress} className="order-del_ad">Delivery address not found !</div>}
                </div>
            
              <div class="pay_type" >
                <h6>Select Payment Type</h6>
                <label class="container-radio">
                  COD
                  <input type="radio" name="radio" value="COD" />
                  <span class="checkmark" onClick={()=>this.paymentType("COD")}></span>
                </label>
                <label class="container-radio">
                  Online
                  <input type="radio" name="radio" value="Online" />
                  <span class="checkmark" onClick={()=>this.paymentType("Online")}></span>
                </label>
              </div>
          </div>
              <div class="Store_footer">
                <div class="bill_1">
                  <p>
                    Total : <span>Rs.{parseFloat(this.state.finalMRP - (this.state.finaldiscount) + 50).toFixed(2)}</span>
                  </p>
                </div>
                <div class="bill_2">
                  <a onClick={this.placeOrder}>PLACE ORDER</a>
                </div>
              </div>
            </div>
        
        </div>
      </div>
    );
  }
}

export default OrderPage;
