import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { SignIn  } from './components/pages/SignIn';
import './App.css';
import Dashboard from './components/pages/Dashboard';




class App extends Component {
  
  render() {
    
    const styles = {

      appStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }
    }

      return ( 
        <Router>
        <div className="App" style={styles.appStyle}>
            <Route exact path="/" render = { props => (

              <React.Fragment>
                {/* <Header /> */}
                <SignIn  />
              </React.Fragment>
              )} />  

              <Route exact path="/dashboard" render = { props => (

              <React.Fragment>
                <Dashboard />
              </React.Fragment>
              )} />  

          </div>
      </Router>
      );
  }
}

export default App;
