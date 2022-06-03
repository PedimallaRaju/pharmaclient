import {React, Component} from "react";
import axios from "axios";
import Services from "./Services";
import { toast } from 'react-toastify';
import './All.css'
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import CartPage from './CartPage';




let baseURL = `https://cmschamps.com/pharma-app/`;

class UploadPrescription extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        prescriptionImage: '',
        imageName: '',
        files: [],
     }

    
     handleSetImage = (event) =>{
        let image = event.target.files[0];
        console.log(event.target.files[0])
        // this.setState({ files: [...this.state.files, ...event.target.files] })
        // console.log(this.state.files);

        this.setState({
            imageName : event.target.files[0].name,
        })
    
        let formData = new FormData();    //formdata object
    
        formData.append('image', event.target.files[0] );   //append the values with key, value paid
        
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post( baseURL + `api/products/upload_prescription`, formData, config)
            .then(response => {
                console.log(response);              
                this.setState({
                    prescriptionImage: response.data.image,
                })
                console.log(this.state.prescriptionImage)

               
            })
            .catch(error => {
                console.log(error);
            }); 

    }


    backButton = () =>{
        this.props.history.push({
            pathname: '/home',
        })
    }


    render() {
        let {prescriptionImage , imageName} = this.state;
        return (
            <div class="cl-issue login_page create_page supplement_page medicine_page checkout_page">
            <div  class="login_details">
            <div class="head-red">
            <h2 onClick={this.backButton}>Upload Prescription</h2>
            </div>
            {/* <StoreHeader /> */}
            <div className="supplement_page page_upload_prescrition">
            <div class="container ">
            <div class="prescription-details" >
            <p>Upload the prescription and buy your medicines</p>
            <div class="Profile-details">
             <div class="prof-img">
               <input type="file" multiple name="file" placeholder='Image' onChange={this.handleSetImage} />
               
            {prescriptionImage && prescriptionImage ? 
                <div class='pres_img'><img src={ baseURL + prescriptionImage} />
                <p> {this.state.imageName}</p>
                
                </div>
               
            : null
           }     
             </div>
             <p>Choose File</p>
            </div>
            <button>Submit</button>
          </div>
            </div>

            < StoreFooter />
            </div>
          </div>
          </div>
          
         );
    }
}

export default UploadPrescription;