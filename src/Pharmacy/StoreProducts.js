import {React, Component} from "react";
import axios from "axios";
import Services from "./Services";
import { toast, ToastContainer } from 'react-toastify';
import LoginPage from "./LoginPage";
import StoreFooter from "./StoreFooter";
import UploadPrescription from './UploadPrescriptionPage';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { stringify } from "query-string";






let StoreID = localStorage.getItem(`storeID`);
let AllProducts = JSON.parse(localStorage.getItem('productsData'));

class StoreProducts extends Component {
    constructor() {
        super();
    }
    state = {
        productsData: '',
        AllProducts: AllProducts,
     }



openProductDescription = (e) =>{
  let name = e.currentTarget.getAttribute("data-value")
  console.log(name)
  var productDescription = document.getElementById(name);
                    if(productDescription.style.display == "block"){
                      productDescription.style.display = "none";
                    }
                    else{
                      productDescription.style.display = "block";
                    }
}


homePage = () => {
  this.props.history.push({
    pathname: '/home',
})  
}


componentDidMount () {
  const obj = {
    store: StoreID,
  }

  Services.getInstance().getStoreProducts(obj).then((result) => {
    console.log('result from API ====>', result)
    if(result.status === true) {
      localStorage.setItem(`productsData`,JSON.stringify(result.data));
      this.setState({
        AllProducts: result.data
      })
    }
    else {
      toast.error("No products available")
    }

  });
  
}

handleOnSearch = (string, results) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
  console.log(string, results)
  this.setState({
    AllProducts: results
  })


  if(results){
    var d = document.getElementById("med-search");
    d.style.display = "block";
    var n = document.getElementById("storefooter");
    n.style.display = "none";

  }
 

  if(string === ""){
    this.setState({
      AllProducts: AllProducts
    })
    var d = document.getElementById("med-search");
    d.style.display = "none";
    var n = document.getElementById("storefooter");
    n.style.display = "flex";
  }
}

handleOnHover = (result) => {
  // the item hovered
  console.log(result)
  this.setState({
    AllProducts: result
  })

  
}

handleOnSelect = (item) => {
  // the item selected
  console.log(item)
  this.setState({
    AllProducts: [item]
  })
  var d = document.getElementById("med-search");
  d.style.display = "none";
  var n = document.getElementById("storefooter");
  n.style.display = "flex";

}

handleOnFocus = () => {
  console.log('Focused')
  var d = document.getElementById("med-search");
  d.style.display = "none";
  
}

onClickCaptureMethod = () =>{
  var d = document.getElementById("med-search");
    d.style.display = "none";
  var n = document.getElementById("storefooter");
    n.style.display = "flex";
}






    render() { 
      let cartArray = [];
        return ( 
            <div class="login_page create_page supplement_page ssp-page">
     
      <div class="login_details">
      <div class="med-header">
      <h2 onClick={this.homePage} > Products</h2>
        </div>
        
        <div className="space">

       
        <div class="container">
        <div className="prod-search" >
          <ReactSearchAutocomplete
            items={AllProducts}
            onSearch={this.handleOnSearch}
            onHover={this.handleOnHover}
            onSelect={this.handleOnSelect}
            onFocus={this.handleOnFocus}
            autoFocus
          />
        </div>

        <div id="med-search" style={{display:"none", height:'100px'}}>
        </div>

        <div class="stores-location medicine-details" onClickCapture={this.onClickCaptureMethod}>
       
          {this.state.AllProducts && this.state.AllProducts.length >=0 ? this.state.AllProducts.map((products, index)=>{
           return(

            <div className="or-prod"  key={index}> 

              <ToastContainer />
      
          <div class="med_loc" >
              <div class="med-img">
                <img src={products.image} />
              </div>
              <div class="med-info" onClick={this.openProductDescription} data-value={products.name}>
                <h6>{products.name} <span> </span></h6>
                <p>{products.dosage}</p>
                <p>{products.stock === "0" ? "Out Of Stock" : "Stock available"}</p>
                <small> Rs. {products.actual_price}</small>
              </div>

              <div>
{/* Storing the Cart Data in Local Storage for CartView Page */}
              <strong onClick={()=>{

                let cartArray = JSON.parse(localStorage.getItem("cartData"));
                if(cartArray == null) cartArray = [];

                cartArray.push(products);
                let duplicatesRemovedCartArray = cartArray.filter((val,id,array) => array.indexOf(val) == id);
                let cartProducts = duplicatesRemovedCartArray.forEach(pr => {
                  pr.qty = 1;
                  pr.prescriptionImage = "";
                  return pr;
                });
                localStorage.setItem(`cartData`, JSON.stringify(duplicatesRemovedCartArray));
                toast.success("Cart updated")

              }}>Add to cart</strong>
              </div>
              
          </div>
    
            <div class="product_type" id = {products.name}>
            <div class="product_img">
              <img src={products.image}/>
              <div class="dis_count">
               <p>{products.discount}% OFF</p>
              </div>
            </div>
            <div class="prod-name">
              <div class="prod_info">
                <h6>{products.name}<span></span></h6>
                <p><small>{products.dosage}</small></p>
                <p><span>{products.rating } <i class="fa-solid fa-star"></i></span></p>
              </div>
              <div class="prod_price">
                <strong>Rs {products.actual_price}</strong>
                <p>Rs {products.price}</p>
              </div>
            </div>

            <div class="prescription-inf">
              <div class="prescrip-matr">
                <p>Prescription Requment</p>
                <p><span>{products.prescription_required === "0" ? "No" : "Yes"}</span></p>
              </div>

              <div class="indications">
                <h6>Indications</h6>  
                <p>{products.content}</p>      
                <ul>
                  <li>Exactly as your doctor has told you</li>
                  <li>Pharmacist if you are not sure</li>
                </ul>       
              </div>
            </div>
          </div>

            </div>

            

          )
        }) :  "No products available" }
            

        </div>

          <StoreFooter />

        

        </div>

        </div>
      </div>
      
    </div>
         );
    }
}
 
export default StoreProducts;