import React, { Component } from 'react';
import {Navigation } from "react-mdl";
// import { BrowserRouter as Router, Route} from 'react-router-dom';
// import { SignIn  } from './components/pages/SignIn';
import Routes from "./router";
import { Link } from "react-router-dom";
import './App.css';



class App extends Component {
  
  logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("Token");
    window.location.href = "/";
  };

  render() {
    
    const styles = {

      appStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }
    }

      return ( 
        //<Router>
        <div className="App" style={styles.appStyle}>
            {/* <Route exact path="/" render = { props => (

              <React.Fragment>
              <SignIn  />
              </React.Fragment>
              )} 
              />   */}

              {/* <Route exact path="/dashboard" render = { props => (

              <React.Fragment>
                 if (localStorage.getItem("Token")) {
                  <Dashboard />
                } else {
                  alert("Error")
                }
                
                
              </React.Fragment>
              )}  */}

{/* 
              <Navigation>
              <Link to="/Dashboard"></Link>
            </Navigation> */}

          {localStorage.getItem("Token") ? (

              <Link to="/Dashboard"></Link>
            
            ) : (
            <Navigation>
              <Link to="/"></Link>
            </Navigation>
          )}


            <div className="page-content" />
            <Routes />



          </div>
      )
  }
}

export default App;
