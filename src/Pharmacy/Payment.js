import React, { Component } from 'react'
import './All.css'
import './Toast.css'
import { toast, ToastContainer } from 'react-toastify';
import Services from './Services';

function loadScript(src){
    return new Promise(resolve=>{
    const script=document.createElement('script')
    script.src= src
    script.onload = () =>{
        resolve(true)
    } 
    script.onerror = () => {
        resolve(false)
    } 
    document.body.appendChild(script)
    
})



}


const __DEV__ = document.domain==='localhost'

function Payment()  {

   async function displayRazorpay() {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res) {
            alert('Razor Pay SDK is not loading. Check your Internet')
            return
        }

        const data = await fetch('http://localhost:3000/razorpay', {Method: 'POST'}).then((t)=>
        t.text()
        )
        console.log(data)

        const options = {
            key: __DEV__? "rzp_test_JlhHNCpqUZlDZk" : "PRODUCTION_KEY", // Enter the Key ID generated from the Dashboard
             // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: data.currency,
            amount: localStorage.getItem(`amount`)*100,
            order_id: data.id,
            name: "Pharmacy",
            description: "Transaction",
            image: "http://localhost:3000/logo512.png",
             //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response){
                console.log(response);
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            prefill: {
                name: "",
                email: "",
                contact: ""
            },
            notes: {
                address: ""
            },
            theme: {
                color: "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

  

    return (
        <div>
            <center>
            <h1>Payment page</h1>
            <button onClick={displayRazorpay} color='primary' >
                Pay
            </button>
            </center>

            
            
        </div>
    )
    
}

export default Payment