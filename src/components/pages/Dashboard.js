import React, { Component } from 'react';
import './pages.css'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Table from "./Table";
import 'bootstrap/dist/css/bootstrap.min.css';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


//var jp = require('jsonpath');

export class Dashboard extends Component {

    constructor(props){

      super(props);
    
        //state for characters value//
        this.state = {

              Employees: [],

              firstName : '',
              lastName : '',
              address : '',
              city : '',
              state : '',
              zip : '',
              homephone : '',
              cellphone : '',
              email : '',
    
            open : false,
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


    handleClickOpen() {
      this.setState({ open: true})
    }

    handleClose() {
      this.setState({ open: false})
  }

    componentDidMount() {

        this.fetchData()
    }


      fetchData(){
      try {
        axios.get('http://localhost:3000/api/employees/getEmployee').then(res =>  

        this.setState({ Employees: res.data}),
        )

      } catch (error) { 
        console.log(error)
      }  
    }


    postEmployee = e => {
      e.preventDefault();
      let EmployeeData = {
              firstName : this.state.firstName,
              lastName : this.state.lastName,
              address : this.state.address,
              city : this.state.city,
              state : this.state.state,
              zip : this.state.zip,
              homephone : this.state.homephone,
              cellphone : this.state.cellphone,
              email : this.state.email,
      };

      axios.post('http://localhost:3000/api/employees/post', EmployeeData).then(res => {
        if (res.data.errors) {
          this.setState({ Error: res.data.errors });
        } else {
          this.setState(prevState=> ({ Employees: [EmployeeData, ...prevState.Employees] }))
          this.handleClose()
          console.log("post request successful")
        }
      });
    };


    handlefirstName = (e) => {
      this.setState({ firstName: e.target.value})
    }

    handlelastName = (e) => {
      this.setState({ lastName: e.target.value})
    }

    handleAddress = (e) => {
      this.setState({ address : e.target.value})
    }

    handleCity = (e) => {
      this.setState({ city: e.target.value})
    }

    handleState = (e) => {
      this.setState({ state : e.target.value})
    }

    handleZip = (e) => {
      this.setState({ zip: e.target.value})
    }

    handleHomePhone = (e) => {
      this.setState({ homephone: e.target.value})
    }

    handleCellPhone = (e) => {
      this.setState({ cellphone : e.target.value})
    }

    handleEmail = (e) => {
      this.setState({ email: e.target.value})
    }

    render(){ 
        //console.log(this.state.Employees)
        const styles = {
          buttonRow: {
            display: 'flex', 
            justifyContent: 'space-between'
          }, 

          buttonStyle : {
            marginBottom: '10px',
            borderRadius: '20px',
            fontFamily: 'Alegreya',
            //fontWeight: 'bold'
            }, 
          
            DialogContent: {
              fontFamily: 'Alegreya'
            }
        }

        return (
            <React.Fragment>


              <div style= {styles.buttonRow} >
             <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle} onClick={this.handleClickOpen}>
                Add Employee
             </Button>

             <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle}>
                LogOut
             </Button>
             </div>
 
             <Table employees= {this.state.Employees}  fetchData = { this.fetchData } />
             {/* <Tab employees= {this.state.Employees} /> */}

            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            {/* <DialogTitle id="form-dialog-title">Employee Data</DialogTitle> */}
            <DialogContent style= {styles.DialogContent} >
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                value = {this.state.firstName}
                onChange = {this.handlefirstName}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last Name"
                value = {this.state.lastName}
                onChange = {this.handlelastName}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Address"
                value = {this.state.address}
                onChange = {this.handleAddress}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="City"
                value = {this.state.city}
                onChange = {this.handleCity}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="State"
                value = {this.state.state}
                onChange = {this.handleState}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Zip"
                value = {this.state.zip}
                onChange = {this.handleZip}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Home Phone"
                value = {this.state.homephone}
                onChange = {this.handleHomePhone}
                type= 'text'
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Cell Phone"
                type="email"
                value = {this.state.cellphone}
                onChange = {this.handleCellPhone}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="email"
                value = {this.state.email}
                onChange = {this.handleEmail}
                fullWidth
              />

            </DialogContent>

            <DialogActions style= {styles.buttonRow} >

                <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle} onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle} onClick={this.postEmployee}>
                  Save
                </Button>
                </DialogActions>
            </Dialog>

            <div>      
            </div>
  
            </React.Fragment>
          )
    }

  }
    


export default Dashboard
