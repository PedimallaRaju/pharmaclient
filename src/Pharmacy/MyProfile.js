import React, { Component, useCallback } from 'react'





let userLogin;
const login =  JSON.parse(localStorage.getItem('login'));
class MyProfile  extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
      userName: "",
      email: "",
      phone: "",
      address: "",
     }


homePage = () =>{
    window.open("/home", "_self");
}

componentDidMount () {
   if(!login){
        this.setState({
          userName: "Guest User",
          email: "",
          phone: "",
          address: ""
        })
      }
      else{
        userLogin = JSON.parse(localStorage.getItem('login'));
        this.setState({
          userName: userLogin.name,
          email: userLogin.email,
          phone: userLogin.phone,
          address: userLogin.address
        })
      }
}






    render() {
      
      const {userName, email, phone, address} = this.state;

     
        return ( 

    <div class="cl-issue login_page create_page profile_page">
      
      <div class="login_details">
          <div class="head-red">
            <h2 onClick={this.homePage}>My Profile</h2>
          </div>  
        <div class="space">
          <div class="container">
             <div class="Profile-details">
               <div class="prof-img">
                <div class="">
                  <input type="file" />
                </div>
               </div>
               <p>{this.state.userName || "Enter your name "}<span></span></p>
             </div>

             <div class="profile-form">
              <form>
                <div class="prof-frm">
                  <label>Phone Number</label>
                  <input type="number" placeholder={this.state.phone || "Enter your phone "} />
                </div>
                 <div class="prof-frm">
                  <label>Email Address</label>
                  <input type="text" placeholder={this.state.email || "Enter your email "} />
                </div>
                 <div class="prof-frm">
                  <label>Address</label>
                  <input type="text-area" placeholder={this.state.address || "Enter your address"} />
                </div>
              </form> 
             </div>
             
          </div>
        </div>
        <div class="Store_footer">
         <button type="submit">UPDATE PROFILE</button>            
        </div>
        </div>
      </div>
       
      
         
    );
    }
}
 
export default MyProfile;