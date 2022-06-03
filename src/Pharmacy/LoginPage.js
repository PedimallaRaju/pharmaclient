import React, { Component } from 'react'
import './All.css'
import './Toast.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from './Services';




const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

export class LoginPage extends Component {
    constructor(props) {
        super(props);

    this.state = {
        email: null,
        password: null,
        
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.register = this.register.bind(this);
      this.forgotPassword = this.forgotPassword.bind(this);

    }


handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({ [name]: value }, () => console.log(this.state));
    };

    

handleSubmit = async (e) => {
      e.preventDefault();

      const obj = {
        username: this.state.email,
        password: this.state.password
      }; 

      Services.getInstance().newLogin(obj).then((result) => {
        console.log('result from API ====>', result)
        if(result.status === true){
            localStorage.setItem(`login`, JSON.stringify(result.data));
            window.open("/cartpage", "_self");
        }
        else{
          toast.error(result.msg);
        }    
    }); 
  }

register = () =>{
      window.open("/register","_self");
    }
forgotPassword = () =>{
        console.log("cccccc")
        window.open("/forgot","_self");
      }

     
 

  render() {
    const { formErrors } = this.state;

    return (
        
        <div className="login_page">
        <div class="space">
        <div className="login_details">
          <div className="container">
            <h2>Login</h2>
            <ToastContainer/>
            <form onSubmit={this.handleSubmit} noValidate>
                
              <div className="cntl-frm">
                <input  
                    className="icon1"
                    type="text" 
                    placeholder="Email or Phone " 
                    name="email"
                    noValidate
                    onChange={this.handleChange} />
              </div>  
              <div className="cntl-frm">
                <input 
                    className="icon2"
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange} />
              </div>
              <a onClick = {this.forgotPassword}>Forgot your password?</a>
              <button type="submit">Login</button>
            </form>
            <span>Not a member?<a onClick = {this.register}> Create an account</a></span>
          </div>
        </div>
        </div>
       
        
      </div>
    )
  }
}

export default LoginPage