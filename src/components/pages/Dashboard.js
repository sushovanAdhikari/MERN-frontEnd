import React, { Component } from "react";
import "./pages.css";
import Table from "./Table";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";
import InputLabel from "@material-ui/core/InputLabel";

export const docSel = elem => document.getElementById(elem);

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Employees: [],

      _id: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      homephone: "",
      cellphone: "",
      email: "",
      existing: false,

      open: false,
      Error: ""
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleClickOpen(employee) {
    //console.log(this.state.existing.value);
    this.setState({ open: true });
    if (employee._id) {
      console.log(employee._id);
      this.setState({
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
        city: employee.city,
        state: employee.state,
        zip: employee.zip,
        homephone: employee.homephone,
        cellphone: employee.cellphone,
        email: employee.email,
        existing: true
      });
    } else {
      console.log("Not exisiting");
      this.setState({
        existing: false,
        _id: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        homephone: "",
        cellphone: "",
        email: ""
      });
    }
  }

  handleClose() {
    this.setState({ open: false, existing: false });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    try {
      axios
        .get("http://localhost:3000/api/employees/getEmployee")
        .then(res => this.setState({ Employees: res.data }));
    } catch (error) {
      console.log(error);
    }
  }

  saveButton = e => {
    e.preventDefault();

    if (this.state.existing) {
      let EmployeeData = {
        id: this.state._id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        homephone: this.state.homephone,
        cellphone: this.state.cellphone,
        email: this.state.email
      };
      console.log(this.state.existing);
      axios
        .put(
          "http://localhost:3000/api/employees/getEmployee/put/",
          EmployeeData
        )
        .then(res => {
          this.handleClose();
          this.fetchData();
          console.log("put request successful");
        })
        .catch(err => {
          console.log(err);
        });

      this.setState({ existing: false });
    } else {
      let EmployeeData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        homephone: this.state.homephone,
        cellphone: this.state.cellphone,
        email: this.state.email
      };
      console.log(this.state.existing);
      axios
        .post("http://localhost:3000/api/employees/post", EmployeeData)
        .then(res => {
          if (res.data.errors) {
            this.setState({ Error: res.data.errors });
            console.log(Error);
          } else {
            this.setState(prevState => ({
              Employees: [EmployeeData, ...prevState.Employees]
            }));
            this.fetchData();
            this.handleClose();
            console.log("post request successful");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handlefirstName = e => {
    this.setState({ Error: "" });
    let newfirstName = e.target.value;
    this.setState({ firstName: newfirstName });
  };

  handlelastName = e => {
    this.setState({ Error: "" });
    this.setState({ lastName: e.target.value });
  };

  handleAddress = e => {
    this.setState({ Error: "" });
    this.setState({ address: e.target.value });
  };

  handleCity = e => {
    this.setState({ Error: "" });
    this.setState({ city: e.target.value });
  };

  handleState = e => {
    this.setState({ Error: "" });
    this.setState({ state: e.target.value });
  };

  handleZip = e => {
    this.setState({ Error: "" });
    this.setState({ zip: e.target.value });
  };

  handleHomePhone = e => {
    this.setState({ Error: "" });
    this.setState({ homephone: e.target.value });
  };

  handleCellPhone = e => {
    this.setState({ Error: "" });
    this.setState({ cellphone: e.target.value });
  };

  handleEmail = e => {
    this.setState({ Error: "" });
    this.setState({ email: e.target.value });
  };

  logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("Token");
    window.location.href = "/";
  };

  render() {
    const styles = {
      buttonRow: {
        display: "flex",
        justifyContent: "space-between"
      },

      buttonStyle: {
        marginBottom: "10px",
        borderRadius: "20px",
        fontFamily: "Alegreya"
      },

      DialogContent: {
        fontFamily: "Alegreya"
      }
    };

    return (
      <React.Fragment>
        <div style={styles.buttonRow}>
          <Button
            variant="contained"
            color="primary"
            className="primaryButton"
            style={styles.buttonStyle}
            onClick={this.handleClickOpen}
          >
            Add Employee
          </Button>

          <Button
            variant="contained"
            color="primary"
            className="primaryButton"
            style={styles.buttonStyle}
            onClick={this.logout}
          >
            LogOut
          </Button>
        </div>

        <Table
          employees={this.state.Employees}
          fetchData={this.fetchData}
          handleClickOpen={this.handleClickOpen}
        />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent style={styles.DialogContent}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              value={this.state.firstName || ""}
              onChange={this.handlefirstName}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Last Name"
              value={this.state.lastName || ""}
              onChange={this.handlelastName}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Address"
              value={this.state.address || ""}
              onChange={this.handleAddress}
              fullWidth
            />
            {/* <p style={error} id="addressError" /> */}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="City"
              value={this.state.city || ""}
              onChange={this.handleCity}
              fullWidth
            />
            {/* <p style={error} id="cityError" /> */}

            <FormControl required fullWidth>
              <InputLabel htmlFor="state-simple">State</InputLabel>
              <Select
                value={this.state.state || ""}
                onChange={this.handleState}
                inputProps={{
                  state: "state",
                  id: "state-simple"
                }}
              >
                <MenuItem value={"Alabama"}>Alabama</MenuItem>
                <MenuItem value={"Alaska"}>Alaska</MenuItem>
                <MenuItem value={"Arizona"}>Arizona</MenuItem>
                <MenuItem value={"Arkansas"}>Arkansas</MenuItem>
                <MenuItem value={"California"}>California</MenuItem>
                <MenuItem value={"Colorado"}>Colorado</MenuItem>
                <MenuItem value={"Connecticut"}>Connecticut</MenuItem>
                <MenuItem value={"Delaware"}>Delaware</MenuItem>
                <MenuItem value={"DistrictOfColumbia"}>
                  District Of Columbia
                </MenuItem>
                <MenuItem value={"Florida"}>Florida</MenuItem>
                <MenuItem value={"Georgia"}>Georgia</MenuItem>
                <MenuItem value={"Hawaii"}>Hawaii</MenuItem>
                <MenuItem value={"Idaho"}>Idaho</MenuItem>
                <MenuItem value={"Illinois"}>Illinois</MenuItem>
                <MenuItem value={"Indiana"}>Indiana</MenuItem>
                <MenuItem value={"Iowa"}>Iowa</MenuItem>
                <MenuItem value={"Kansas"}>Kansas</MenuItem>
                <MenuItem value={"Kentucky"}>Kentucky</MenuItem>
                <MenuItem value={"Louisiana"}>Louisiana</MenuItem>
                <MenuItem value={"Maine"}>Maine</MenuItem>
                <MenuItem value={"Maryland"}>Maryland</MenuItem>
                <MenuItem value={"Massachusetts"}>Massachusetts</MenuItem>
                <MenuItem value={"Michigan"}>Michigan</MenuItem>
                <MenuItem value={"Minnesota"}>Minnesota</MenuItem>
                <MenuItem value={"Mississippi"}>Mississippi</MenuItem>
                <MenuItem value={"Missouri"}>Missouri</MenuItem>
                <MenuItem value={"Montana"}>Montana</MenuItem>
                <MenuItem value={"Nebraska"}>Nebraska</MenuItem>
                <MenuItem value={"Nevada"}>Nevada</MenuItem>
                <MenuItem value={"NewHampshire"}>New Hampshire</MenuItem>
                <MenuItem value={"NewJersey"}>New Jersey</MenuItem>
                <MenuItem value={"NewMexico"}>New Mexico</MenuItem>
                <MenuItem value={"NewYork"}>New York</MenuItem>
                <MenuItem value={"NorthCarolina"}>North Carolina</MenuItem>
                <MenuItem value={"NorthDakota"}>North Dakota</MenuItem>
                <MenuItem value={"Ohio"}>Ohio</MenuItem>
                <MenuItem value={"Oklahoma"}>Oklahoma</MenuItem>
                <MenuItem value={"Oregon"}>Oregon</MenuItem>
                <MenuItem value={"Pennsylvania"}>Pennsylvania</MenuItem>
                <MenuItem value={"RhodeIsland"}>Rhode Island</MenuItem>
                <MenuItem value={"SouthCarolina"}>South Carolina</MenuItem>
                <MenuItem value={"SouthDakota"}>South Dakota</MenuItem>
                <MenuItem value={"Tennessee"}>Tennessee</MenuItem>
                <MenuItem value={"Texas"}>Texas</MenuItem>
                <MenuItem value={"Utah"}>Utah</MenuItem>
                <MenuItem value={"Vermont"}>Vermont</MenuItem>
                <MenuItem value={"Virginia"}>Vermont</MenuItem>
                <MenuItem value={"Washington"}>Vermont</MenuItem>
                <MenuItem value={"Wyoming"}>Vermont</MenuItem>
                <MenuItem value={"WestVirginia"}>West Virginia</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            {/* <p style={error} id="stateError" /> */}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Zip"
              value={this.state.zip || ""}
              onChange={this.handleZip}
              fullWidth
            />
            {/* <p style={error} id="zipError" /> */}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Home Phone"
              value={this.state.homephone || ""}
              onChange={this.handleHomePhone}
              type="text"
              fullWidth
            />
            {/* <p style={error} id="homephoneError" /> */}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Cell Phone"
              type="email"
              value={this.state.cellphone || ""}
              onChange={this.handleCellPhone}
              fullWidth
            />
            {/* <p style={error} id="cellphoneError" /> */}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              value={this.state.email || ""}
              onChange={this.handleEmail}
              fullWidth
            />
          </DialogContent>

          <DialogActions style={styles.buttonRow}>
            <Button
              variant="contained"
              color="primary"
              className="primaryButton"
              style={styles.buttonStyle}
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="primaryButton"
              style={styles.buttonStyle}
              onClick={this.saveButton}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Dashboard;
