import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import  { Redirect } from 'react-router-dom' 
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import './pages.css'

const error = {
    color: "red"
  };

export const docSel = elem => document.getElementById(elem);


export class SignIn extends Component {

    state = {
        email: "",
        password: "",
        loggedIn: false,
        Error:""
    }

    //classes = useStyles();

    onChange = (e) => this.setState( { [e.target.name] : e.target.value } );


    onSubmit = (e) => {
        //e.preventDefault();
        axios
        .post('http://localhost:3000/api/user/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
               console.log(res)
               localStorage.setItem("Token", res.data.token)
               this.setState({ loggedIn: true })
            })
            .catch(e => {
                console.log(e);
                alert('Email or Password wrong')
            })
    }

    onChangeEmail = (e) => {
        this.setState({ Error: "" });
        let emailElem = docSel("emailError");
        let newEmail = e.target.value;
        this.setState({ email: newEmail });

        if(newEmail === "") {
            emailElem.innerHTML = "Please enter your email."
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
                emailElem.innerHTML = "Please enter valid email.";
              } else {
                emailElem.innerHTML = "";
              }
        }
    }

    onChangePassword = (e) => this.setState({ password: e.target.value})

    render(){

        const styles = {
            buttonRow: {
              display: 'flex', 
              justifyContent: 'space-between'
            }, 
      
            buttonStyle : {
              marginBottom: '10px',
              borderRadius: '20px',
              fontFamily: 'Alegreya',
              textTransform: 'none'
              //fontWeight: 'bold'
              }, 
            
            cardContent : {
                display: 'flex',
                flexDirection: 'column'
            }, 
            
            card : {
                width: '18em',
                alignSelf: 'center',
                marginTop: '7em', 
                fontFamily: 'Merriweather, serif',
                border: 'solid transparent',
                boxShadow: '0px 1px 5px 2px rgba(101,84,199,1)'
            }, 
            
            cardAction: {
                justifyContent: 'center'
            },

            title: {
                alignSelf: 'center', 
                fontSize: '25px',
                textShadow: '5px 3px 7px rgba(206,89,55,0.89)',
                letterSpacing: '16px'
            },

            font: {
                fontSize: '25px'
            }
          }

        
        if (this.state.loggedIn) {
            return (
              <Redirect
                to={{
                  pathname: "/Dashboard",
                }}
              />
            );
        }
        
        else{
        return (
            <Router>
            
            <Card style= {styles.card}>
            <CardContent style= {styles.cardContent}>

            {/* <form className={this.classes.container} noValidate autoComplete="off"> */}
            
            <Typography variant="h5" component="h2" style= {styles.title}>
            LogIn
            </Typography>


            <TextField
            autoFocus
            id="outlined-search"
            label="Email"
            //type="search"
            margin="dense"
            variant="outlined"
            value =  { this.state.email }
            onChange = {this.onChangeEmail}
             />

             <p style={error} id="emailError" />

            <TextField
                autoFocus
                id="outlined-search"
                label="Password"
                type="search"
                margin="dense"
                variant="outlined"
                value =  { this.state.password }
                onChange = {this.onChangePassword}
            />
            
            <CardActions style= {styles.cardAction}>
            <Button variant="contained" color="primary" className="primaryButton" style={styles.buttonStyle} onClick={this.onSubmit} disableRipple>
                   <span> SignIn </span>
            </Button>
            </CardActions>

            {/* </form> */}
            </CardContent>

            </Card>

            </Router> 

            )
        }
    }
}

export default SignIn
