import React, { Component } from "react";
import { Navigation } from "react-mdl";
import Routes from "./router";
import { Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("Token");
    window.location.href = "/";
  };

  render() {
    const styles = {
      appStyle: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }
    };

    return (
      <div className="App" style={styles.appStyle}>
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
    );
  }
}

export default App;
