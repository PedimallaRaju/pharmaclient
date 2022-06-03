import React, {Component} from "react";
import Services from "./Services";
import StoreFooter from "./StoreFooter";
import StoreHeader from "./StoreHeader";


const login =  JSON.parse(localStorage.getItem('login'));

class SuccessOrder extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        message: this.props.location.state,
        address: this.props.location.shipping,
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




    render() { 
        return ( 
            <div class="success_page order_success">
              <StoreHeader />
                    
                <div className="success-cnt">
                  <div className="container">
                    <div className="success-p">
                      <h2>
                      <i class="fa-solid fa-circle-check"></i>  Thank you!
                      </h2>
                      <p style={{textAlign:"center"}}>{this.state.message}</p>
                      {/* <p>Confirmation will be sent to your mobile number.</p> */}
                      <address>
                        <b>Shipping To : </b>
                        {this.state.address}
                      </address>
                      <a onClick={this.myOrders} >Review or edit your recent orders</a>
                    </div>
                  </div>
                </div>
            <StoreFooter />
            
          </div>
        );
    }
}
 
export default SuccessOrder;