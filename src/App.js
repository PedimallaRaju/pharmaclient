import './App.css';
import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import {LoginPage} from './Pharmacy/LoginPage';
import {RegistrationPage} from './Pharmacy/RegistrationPage';
import ForgotPassword from './Pharmacy/ForgotPassword';
import { LaunchingPage } from './Pharmacy/LaunchingPage';
import  HomePage  from './Pharmacy/HomePage';
import StoreProducts from './Pharmacy/StoreProducts';
import CartPage from './Pharmacy/CartPage';
import MyOrdersPage from './Pharmacy/MyOrders';
import UploadPrescription from './Pharmacy/UploadPrescriptionPage';
import MyProfile from './Pharmacy/MyProfile';
import Payment from './Pharmacy/Payment';
import OrderPage from './Pharmacy/OrderPage';
import SuccessOrder from './Pharmacy/SuccessOrder';
import OrderStatus from './Pharmacy/OrderStatus';




class App extends Component {

//   state = { 
//     user: '',
//    }

//    componentDidMount() {
   
//     const user =  JSON.parse(localStorage.getItem(`login`)) || {};
//     this.setState ({user});
//    console.log(!this.state.user);
// }

  render() {
    // const user =  JSON.parse(localStorage.getItem(`login`))
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component = {LaunchingPage} />
          <Route path='/home' component={HomePage} />
          <Route path='/home' component = {HomePage} /> 
          <Route path='/login' component = {LoginPage} />
          <Route path='/register' component = {RegistrationPage} />
          <Route path='/forgot' component = {ForgotPassword} />
          <Route path='/storeproducts' component={StoreProducts} />
         <Route path = '/cartpage' component={CartPage} />
         <Route path = '/myorders' component={MyOrdersPage} />
         <Route path = '/uploadprescription' component={UploadPrescription} />
         <Route path = '/myprofile' component={MyProfile} />
         <Route path='/orderpage' component={OrderPage} />
         <Route path = '/payment' component={Payment} />
         <Route path = '/successorder' component={SuccessOrder} />
         <Route path = '/orderstatus' component={OrderStatus} />

         


          

          {/* {this.state.user && <Route path = '/storeproducts' component={StoreProducts} />}
         
         
         

          {user && user.id ? <Redirect to='/StoreProducts'/> : <Redirect to='/login'/>} */}
          
        </Switch>
        </BrowserRouter>
        
    );
  }
}

export default App
