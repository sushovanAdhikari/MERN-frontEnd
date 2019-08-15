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


export class SignIn extends Component {

    state = {
        email: "",
        password: "",
        loggedIn: false
    }

    //classes = useStyles();

    onChange = (e) => this.setState( { [e.target.name] : e.target.value } );


    onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/user/login', {email: this.state.email, password: this.state.password}).then(this.setState({ loggedIn: true}), console.log('successful'))
    }

    onChangeEmail = (e) => this.setState({ email: e.target.value })

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
                {/* <div style = {formBox} >
                <form onSubmit={this.onSubmit} style= {{ display: 'flex', flexDirection:"column", alignItems:"center" }}>
                    <input type="text" 
                    name= "email" 
                    style = {{flex: '10', padding: '5px', marginBottom: '15px' }}
                    placeholder = "Email"
                    value =  { this.state.email }
                    onChange = {this.onChange}
                    />

                    <input type="text" 
                    name= "password" 
                    style = {{flex: '10', padding: '5px' }}
                    placeholder = "Password"
                    value =  { this.state.password }
                    onChange = {this.onChange}
                    />

                    <Button variant="primary"
                        type= "submit"
                        value = "Log In"
                        className = "btn"
                        style = {{ flex: '1', marginTop: '10px' }}
                    >Log In</Button>
                </form>
                </div> */}


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

            <TextField
                id="outlined-search"
                label="Password"
                type="search"
                margin="normal"
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
