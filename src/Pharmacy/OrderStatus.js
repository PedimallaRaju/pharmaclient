import React, {Component} from "react";
import StoreFooter from "./StoreFooter";
import StoreHeader from "./StoreHeader";




class OrderStatus extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
      indOrderProducts: this.props.location.state,
      deliveryStatus: this.props.location.status,
     }


     myOrders = () =>{
       this.props.history.push({
        pathname: '/myorders',
        })
     }

     componentDidMount(){
       switch (this.state.deliveryStatus) {
        case "Pending":
          document.getElementById("pending").classList.add("active");  
          break;
          
        case "Conformed":
          document.getElementById("pending").classList.add("active");   
          document.getElementById("conformed").classList.add("active"); 
          break;

        case "Processed":
          document.getElementById("pending").classList.add("active");   
          document.getElementById("conformed").classList.add("active");
          document.getElementById("processed").classList.add("active");
          break;
        case "Picked":
          document.getElementById("pending").classList.add("active");   
          document.getElementById("conformed").classList.add("active");
          document.getElementById("processed").classList.add("active");
          document.getElementById("picked").classList.add("active");
          break;
        case "Outfordelivery":
          document.getElementById("pending").classList.add("active");   
          document.getElementById("conformed").classList.add("active");
          document.getElementById("processed").classList.add("active");
          document.getElementById("picked").classList.add("active");
          document.getElementById("outfordelivery").classList.add("active");
          break;
        case "Delivered":
          document.getElementById("pending").classList.add("active");   
          document.getElementById("conformed").classList.add("active");
          document.getElementById("processed").classList.add("active");
          document.getElementById("picked").classList.add("active");
          document.getElementById("outfordelivery").classList.add("active");
          document.getElementById("outfordelivery").classList.add("active");
          document.getElementById("delivered").classList.add("active");
          break;    
       
         default:
           break;
       }
      
     }






    render() { 

        return ( 

                <div class="cl-issue login_page create_page tracking_page">                 
                  <div class="login_details">
                      <div class="head-red">
                        <h2 onClick={this.myOrders}>Order Status</h2>
                      </div>  
                    <div class="space">  
                      <div class="container">
                      <div className="ord-stat-info">
                            {this.state.indOrderProducts && this.state.indOrderProducts.length>0 ? this.state.indOrderProducts.map((indOrder, index)=>{

                                        return (
                                                <div class="or-med_loc" key={index}>
                                                    <div class="or-med-img">
                                                      <img src={indOrder.image}/>
                                                    </div>
                                                    <div class="or-med-info" >
                                                        <h6>{indOrder.name}<span> </span></h6>
                                                        <p>Items: {indOrder.qty} </p>
                                                        <small>Rs. {indOrder.price}</small>
                                                    </div>
                                                  </div>
                                          
                                        )
                                      }) : ""}
                          </div>


                        <div class="tracker2">
                          <h5>Order TImeline</h5>
                          <ul>
                            <li id="pending">
                              <div class="date_time">
                                <p>31 jan <span>13:30am</span></p>
                              </div>
                              <div class="shipping-details">
                                <strong>Pending</strong>
                                <p>Order need to be confirmed by the seller</p>
                              </div>
                            </li>
                            <li id="conformed">
                              <div class="date_time">
                                <p>31 jan <span>13:30am</span></p>
                              </div>
                              <div class="shipping-details">
                                <strong>Conformed</strong>
                                <p>Order has been conformed by the seller</p>
                              </div>
                            </li>
                            <li id="processed">
                              <div class="date_time">
                                <p>31 jan <span>13:30am</span></p>
                              </div>
                              <div class="shipping-details">
                                <strong>Processed</strong>
                                <p>Order is processed</p>
                              </div>
                            </li>
                            <li id="picked">
                              <div class="date_time">
                                <p>31 jan <span>13:30am</span></p>
                              </div>
                              <div class="shipping-details">
                                <strong>Picked</strong>
                                <p>Product has been picked by the delivery partner</p>
                              </div>
                            </li>
                            <li id="outfordelivery">
                              <div class="date_time">
                                <p>31 jan <span>13:30am</span></p>
                              </div>
                              <div class="shipping-details">
                                <strong>Out For Delivery</strong>
                                <p>Product is near by you and out for delivery</p>
                              </div>
                            </li>
                            <li id="delivered">
                              <div class="date_time">
                                <p>31 jan <span>13:30am</span></p>
                              </div>
                              <div class="shipping-details">
                                <strong>Delivered</strong>
                                <p>Delivered</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>  
                    </div>
                    <StoreFooter />
                  </div>
                </div>
         );
    }
}
 
export default OrderStatus;