import React, { Component } from 'react'
import './All.css'
import './Toast.css'
import { toast, ToastContainer } from 'react-toastify';
import Services from './Services';







export class RegistrationPage extends Component {

  constructor(props) {
    super(props);

this.state = {
    name: null,
    phone: null,
    email: null,
    password: null,
    
  };
  this.handleSubmit = this.handleSubmit.bind(this);

}

handleChange = e => {
  e.preventDefault();
  const { name, value } = e.target;
  this.setState({ [name]: value }, () => console.log(this.state));
};

handleSubmit = async (e) => {
  e.preventDefault();

  const obj = {
    name: this.state.name,
    phone: this.state.phone,
    email: this.state.email,
    password: this.state.password,
  }; 
  
  Services.getInstance().newRegistration(obj).then((result) => {
    console.log('result from API ====>', result)
    if(result.status === true){
      toast.success(result.msg + " please Login");     
    }
    else if(result.status === false){
      toast.error(result.msg);
    }
    else{
      toast.error("Something went wrong !!!");
    }   
});

}



login = () =>{
  window.open("/login","_self");
}



  render() {
    return (
      <div class="cl-issue login_page create_page">
     <ToastContainer/>
      <div class="login_details">
          <div class="head-red">
            <h2>Create an account</h2>
          </div>  
        <div class="space">
          <div class="container">
            <div class="create_forms">
              <form onSubmit={this.handleSubmit} noValidate>
                <div class="cntl-frm">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    name="name"
                    noValidate
                    onChange={this.handleChange} 
                    required />
                </div>  
                <div class="cntl-frm">
                  <input 
                    type="number" 
                    placeholder="Mobile Number"
                    name="phone"
                    noValidate
                    onChange={this.handleChange} 
                    required 
                    maxLength={10} />
                </div>
                <div class="cntl-frm">
                  <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    noValidate
                    onChange={this.handleChange} 
                    required />
                </div>  
                <div class="cntl-frm">
                  <input 
                    type="text" 
                    placeholder="Password"
                    name="password"
                    noValidate
                    onChange={this.handleChange} 
                    required />
                </div>
                
                <button type="submit">Create An Account</button>
                 <p>By signing up you agree to our privacy policy and terms</p>
                  <span>Already have an account?<a onClick={this.login}> Login</a></span>
              </form>
            </div>  
           
          </div>
        </div>  
      </div>
      
    </div>
    )
  }
}

export default RegistrationPage