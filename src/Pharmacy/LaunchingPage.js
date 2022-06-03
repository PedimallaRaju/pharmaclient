import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";
import Services from "./Services";

export class LaunchingPage extends Component {
  state = {
    loading: false,
  };

  homePage = () => {
    document.getElementById("spinner").style.display = "block";
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        const obj = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };
        console.log(obj);
        Services.getInstance()
          .getAllNearByStores(obj)
          .then((result) => {
            console.log("result from API ====>", result);

            if (result.status === false) {
              var spinner = document.getElementById("spinner");
              if (spinner.style.display == "block") {
                spinner.style.display = "none";
              }

              toast.error(result.msg);
              window.open("/home", "_self");
            } else if (result.status === true) {
              var spinner = document.getElementById("spinner");
              if (spinner.style.display == "block") {
                spinner.style.display = "none";
              }

              localStorage.setItem(`stores`, JSON.stringify(result.data));
              window.open("/home", "_self");
            } else {
              var spinner = document.getElementById("spinner");
              if (spinner.style.display == "block") {
                spinner.style.display = "none";
              }
              toast.error("Select location and search again");
            }
          });
      });
    } else {
      toast.error("Please Turn GPS On");
    }
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        const obj = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };
        console.log(obj);
        Services.getInstance()
          .getAllNearByStores(obj)
          .then((result) => {
            console.log("result from API ====>", result);

            if (result.status === false) {
              var spinner = document.getElementById("spinner");
              if (spinner.style.display == "block") {
                spinner.style.display = "none";
              }

              toast.error(result.msg);
            } else if (result.status === true) {
              var spinner = document.getElementById("spinner");
              if (spinner.style.display == "block") {
                spinner.style.display = "none";
              }

              localStorage.setItem(`stores`, JSON.stringify(result.data));
              // window.open("/home", "_self");
              console.log(this.state.resultArr);
            } else {
              var spinner = document.getElementById("spinner");
              if (spinner.style.display == "block") {
                spinner.style.display = "none";
              }
              toast.error("Select location and search again");
            }
          });
      });
    } else {
      toast.error("Please Turn GPS On");
    }
    // For Auto-redirecting the page after some Time
    // this.timeoutHandle = setTimeout(()=>{
    //      window.open("/home", "_self");
    // }, 3000);
  }

  render() {
    return (
      <div class="pharma_page">
        <div class="pharma_logo">
          <ToastContainer />
          <div class="pharma_img">
            <div class="loader" id="spinner">
              <div class="inner one"></div>
              <div class="inner two"></div>
              <div class="inner three"></div>
            </div>
            <img src="" alt="logo" />
          </div>

          <strong>Pharma</strong>
          <div onClick={this.homePage} style={{ marginTop: "22%" }}>
            <a>
              <i class="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LaunchingPage;
