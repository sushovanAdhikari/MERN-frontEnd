import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js'


const error = {
  color: "red"
};

export class Table extends Component {

  constructor(props){

    super(props);

      this.state = {
              open : false,
              _id: '',
              firstName : '',
              lastName : '',
              address : '',
              city : '',
              state : '',
              zip : '',
              homephone : '',
              cellphone : '',
              email : '',
      }

      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen(employee) {
    this.setState({ 
              open: true,
              _id : employee._id,
              firstName : employee.firstName,
              lastName : employee.lastName,
              address : employee.address,
              city : employee.city,
              state : employee.state,
              zip : employee.zip,
              homephone : employee.homephone,
              cellphone : employee.cellphone,
              email : employee.email,
    })
  }

  handleClose() {
    this.setState({ open: false })
}


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


updateEmployee = e => {
 // e.preventDefault();
  let EmployeeData = {
          id: this.state._id,
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

  axios.put('http://localhost:3000/api/employees/getEmployee/put/', EmployeeData).then(res => {
      
      this.handleClose()
      this.props.fetchData();
      console.log("put request successful")
  }).catch(err => { console.log(err) } );


};


  render() {
    
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

        tableData : {
          textDecoration: 'underline',
          color: '#3f51b5',
          cursor: 'pointer'
        }
    }
    return (
      <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
                { (this.props.employees.length > 0) ?  this.props.employees.map( (employee, index) => {
                  return (
                      <tr key= { index } > 
                      <td><span onClick={ (e) =>   {this.handleClickOpen(employee)}}>  <span style = {styles.tableData}>{ employee.firstName } { employee.lastName } </span> </span> </td>
                      <td>{ employee.email } </td>
                      </tr>
  
              )})  : <tr><td colSpan="5">Loading...</td></tr> } 
  
        </tbody>
        </table>
  
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              {/* <DialogTitle id="form-dialog-title">Employee Data</DialogTitle> */}
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="First Name"
                  value = {this.state.firstName}
                  onChange = {this.handlefirstName}                            
                  fullWidth
                />
                <p style={error} id="firstNameError" />
                
   
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
  
                <FormControl required fullWidth>
                <InputLabel htmlFor="age-required" >State</InputLabel>
                  <Select
                    value = {this.state.state}
                    onChange={this.handleState}
                    name="state"
                    inputProps={{
                      id: 'age-required',
                    }}
                  >

            <MenuItem value={'Alabama'}>Alabama</MenuItem>
            <MenuItem value={'Alaska'}>Alaska</MenuItem>
            <MenuItem value={'Arizona'}>Arizona</MenuItem>
            <MenuItem value={'Arkansas'}>Arkansas</MenuItem>
            <MenuItem value={'California'}>California</MenuItem>
            <MenuItem value={'Colorado'}>Colorado</MenuItem>
            <MenuItem value={'Connecticut'}>Connecticut</MenuItem>
            <MenuItem value={'Delaware'}>Delaware</MenuItem>
            <MenuItem value={'DistrictOfColumbia'}>District Of Columbia</MenuItem>
            <MenuItem value={'Florida'}>Florida</MenuItem>
            <MenuItem value={'Georgia'}>Georgia</MenuItem>
            <MenuItem value={'Hawaii'}>Hawaii</MenuItem>
            <MenuItem value={'Idaho'}>Idaho</MenuItem>
            <MenuItem value={'Illinois'}>Illinois</MenuItem>
            <MenuItem value={'Indiana'}>Indiana</MenuItem>
            <MenuItem value={'Iowa'}>Iowa</MenuItem>
            <MenuItem value={'Kansas'}>Kansas</MenuItem>
            <MenuItem value={'Kentucky'}>Kentucky</MenuItem>
            <MenuItem value={'Louisiana'}>Louisiana</MenuItem>
            <MenuItem value={'Maine'}>Maine</MenuItem>
            <MenuItem value={'Maryland'}>Maryland</MenuItem>
            <MenuItem value={'Massachusetts'}>Massachusetts</MenuItem>
            <MenuItem value={'Michigan'}>Michigan</MenuItem>
            <MenuItem value={'Minnesota'}>Minnesota</MenuItem>
            <MenuItem value={'Mississippi'}>Mississippi</MenuItem>
            <MenuItem value={'Missouri'}>Missouri</MenuItem>
            <MenuItem value={'Montana'}>Montana</MenuItem>
            <MenuItem value={'Nebraska'}>Nebraska</MenuItem>
            <MenuItem value={'Nevada'}>Nevada</MenuItem>
            <MenuItem value={'NewHampshire'}>New Hampshire</MenuItem>
            <MenuItem value={'NewJersey'}>New Jersey</MenuItem>
            <MenuItem value={'NewMexico'}>New Mexico</MenuItem>
            <MenuItem value={'NewYork'}>New York</MenuItem>
            <MenuItem value={'NorthCarolina'}>North Carolina</MenuItem>
            <MenuItem value={'NorthDakota'}>North Dakota</MenuItem>
            <MenuItem value={'Ohio'}>Ohio</MenuItem>
            <MenuItem value={'Oklahoma'}>Oklahoma</MenuItem>
            <MenuItem value={'Oregon'}>Oregon</MenuItem>
            <MenuItem value={'Pennsylvania'}>Pennsylvania</MenuItem>
            <MenuItem value={'RhodeIsland'}>Rhode Island</MenuItem>
            <MenuItem value={'SouthCarolina'}>South Carolina</MenuItem>
            <MenuItem value={'SouthDakota'}>South Dakota</MenuItem>
            <MenuItem value={'Tennessee'}>Tennessee</MenuItem>
            <MenuItem value={'Texas'}>Texas</MenuItem>
            <MenuItem value={'Utah'}>Utah</MenuItem>
            <MenuItem value={'Vermont'}>Vermont</MenuItem>
            <MenuItem value={'Virginia'}>Vermont</MenuItem>
            <MenuItem value={'Washington'}>Vermont</MenuItem>
            <MenuItem value={'Wyoming'}>Vermont</MenuItem>
            <MenuItem value={'WestVirginia'}>West Virginia</MenuItem>

                  </Select>
                  <FormHelperText>Required</FormHelperText>
                  </FormControl>
  
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
  
              <DialogActions style= {styles.buttonRow}>
  
                  <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle} onClick={this.handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle} onClick={this.updateEmployee}>
                    Save
                  </Button>

              </DialogActions>
              </Dialog>
        </React.Fragment>
    )
}
}

export default Table;


