import React, { Component } from 'react'
import Services from './Services';
import myOrders from './MyOrders';




const login =  JSON.parse(localStorage.getItem('login'));


class StoreHeader extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
      userName: "",
      email: "",
      
     }




sideMenuOpen = () =>{
        var menuBox = document.getElementById('menu-box');
        if(menuBox.style.display == "block"){
          menuBox.style.display = "none";
        }
        else{
          menuBox.style.display = "block";
        }

        if(!login){
          document.getElementById('myorderopt').style.display = "none";
          document.getElementById('myprofileopt').style.display = "none";
          
        }

      }
sideMenuClose = () =>{
        var menuBox = document.getElementById('menu-box');
        if(menuBox.style.display == "block"){
          menuBox.style.display = "none";
        }
        else{
          menuBox.style.display = "block";
        }

      }
uploadPrescription = () => {
  window.open("/uploadprescription", "_self")
}

myOrders = () =>{
  const obj = {
    user_id: login.id,
  }
  Services.getInstance().myOrderList(obj).then((result) => {
    console.log('result from API ====>', result.data)        
    if(result.status === true){
      localStorage.setItem(`myorders`,JSON.stringify(result.data));
      window.open("/myorders", "_self"); 
      
    }
    else if(result.status === false){
        window.open("/myorders", "_self");
    }
  });
}

myProfilePage = () =>{
  window.open("/myprofile", "_self");
}

logout = () =>{
  if(login){
      localStorage.removeItem(`login`);
      localStorage.removeItem(`DeliveryAddress`);
      localStorage.removeItem(`cartData`);
      localStorage.removeItem(`amount`);
      localStorage.removeItem(`myorders`);
      window.open("/home","_self");
  }
  else{
    window.open("/login","_self");
  }
}

componentDidMount (){
  if(!login){
    this.setState({
      userName: "Guest User",
      email: ""
    })
  }
  else{
    this.setState({
      userName: login.name,
      email: login.email
    })
  }
}
 
      


    




    render() {
      const {userName, email} = this.state;

     
        return ( 
            <div>
                <div class="Store_header">
          <div class="store-head-lft">
            <div class="menu-btn"  onClick={this.sideMenuOpen}>
              <span></span>
            </div>
            <p >{this.state.userName}</p>
          </div>
          <div class="store-head-ryt">
              <ul>
                <li class="_li"><a ><img src="Man.png" /></a></li>
                {/* <li><a ><img src="" alt=""></a></li>  */}
              </ul>
          </div>
          <div class="toggle_menu" id="menu-box">
            <div class="prof-log">
              <div class="prof-log-img">
                <img src="man.png" />
              </div>
              <div class="prof-log-inf">
                <strong>{this.state.userName}</strong>
                <p>{this.state.email}</p>
              </div>
              <div class="close_icon" onClick={this.sideMenuClose}>
                <img src="close_icon.png" />
              </div>
            </div>
            <ul>  
            <li> <a   onClick={this.uploadPrescription}><img src="shopping-cart.png" />Upload Prescription & Buy</a></li>
              <li id='myorderopt'><a  onClick={this.myOrders}><img src="shopping-cart.png" />My Orders</a></li>
              <li id='myprofileopt'><a  onClick={this.myProfilePage}><img src="order-delivery.png" />My Profile</a></li>
              <li><a onClick={this.logout}><img src="log-out.png" />Login / Logout</a></li>
            </ul>
          </div>
        </div>
            </div>
         );
    }
}
 
export default StoreHeader;