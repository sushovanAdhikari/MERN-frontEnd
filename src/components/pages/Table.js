import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Table extends Component {

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
                      <td><span onClick={ (e) =>   {this.handleClickOpen(employee)}}>  { employee.firstName } { employee.lastName } </span> </td>
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


