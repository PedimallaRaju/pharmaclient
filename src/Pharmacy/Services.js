import { React, Component } from "react";
import LoginPage from './LoginPage';
import  HomePage  from './HomePage';
import StoreProducts from './StoreProducts';
import UploadPrescription from './UploadPrescriptionPage';





let baseURL = `https://cmschamps.com/pharma-app/`;

export class Services extends Component{


static myInstance = null;

static getInstance() {  
    return new Services();
}


async getAllNearByStores(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/stores/near_stores`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




async newRegistration(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/users/register`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async newLogin(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/users/login`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}



async getStoreProducts(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/products/products_store`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async newOrderPlacing(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/cart/add_cart`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async myOrderList(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/cart/my_orders`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}


async orderIdProducts(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/cart/order_by_id`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body:  JSON.stringify(obj)
                        
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}




























    render() 
    
    {
return (
<div>hello</div>
)


    }
}

export default Services