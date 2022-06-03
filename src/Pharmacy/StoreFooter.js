import React, { Component } from 'react'
import Services from './Services';



const login =  JSON.parse(localStorage.getItem('login'));

class StoreFooter extends Component {
    constructor(props) {
        super(props);
    }
    state = { 

     }


     homePage = () =>{
        window.open("/home", "_self");
      }
      
      myOrdersPage = () =>{
        if(!login){
          window.open("/myorders", "_self");  
        }
        else{
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
      }
      cartPage = () =>{
        window.open("/cartpage", "_self");
      }


      
    render() { 
        return ( 
            <div>

        <div class="Store_footer" id='storefooter'>
          <div>
           <a onClick={this.homePage}><img src="myHome.png" />Home
            </a>
          </div>
           <div>
            <a onClick={this.myOrdersPage}><img src="boxIcon.png" />My Orders
            </a>
          </div>
           <div>
            <a onClick={this.cartPage}><img src="cart.png"  />Cart
            </a>
          </div>
        </div>

            </div>
         );
    }
}
 
export default StoreFooter;