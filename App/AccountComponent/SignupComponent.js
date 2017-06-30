import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  ListView,
  TextInput,
  Text,
  Switch,
  Slider,
  Picker,
  ScrollView
} from 'react-native';

import MobxReactForm from 'mobx-react-form';

import {startMainApp} from './../commons.js';
import firebase from '../firebase';

import { Container, Content, Item, Form, Input, Button } from 'native-base';

import validatorjs from 'validatorjs';

import {getAccountStore} from './AccountStore.js';

const plugins = { dvr: validatorjs };

const fields = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Insert Email',
  rules: 'required|email|string|between:5,25',
}, {
  name: 'password',
  label: 'Password',
  placeholder: 'Insert Password',
  rules: 'required|string|between:5,25',
}, {
  name: 'passwordConfirm',
  label: 'Password Confirmation',
  placeholder: 'Confirm Password',
  rules: 'same:password',
}];

class SignupForm extends MobxReactForm {
  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
}


export default class SignupComponent extends Component {

  constructor(props) {
    super(props);
    this.accountStore = getAccountStore();
    this.state = {
      fn: '',
      ln: '',
      email: '',
      pw: '',
    }
  }

  /** NAVIGATOR ACTIONS */
  navigateToMap(){
    startMainApp();
  }
  /*/ NAVIGATOR ACTIONS */

  /** ACCOUNT ACTIONS */
  signUpWrapper() {

    //First, check if valid
    // if (!this.valFirstName()) {
    //   alert("First name must not be empty and must contain alphabetical characters only!");
    //   return false;
    // }
    // if (!this.valLastName()) {
    //   alert("Last name must not be empty and must contain alphabetical characters only!");
    //   return false;
    // }
    if (!this.valEmail()) {
      alert("Email format is not valid");
      return false;
    }
    if (!this.valPassword()) {
      alert("Password must be 8 characters long, contain one uppercase, one lowercase character, and a number")
      return false;
    }
    //Passed all validation steps

    this.accountStore.signup(this.state.email, this.state.pw)
    .then( () => {
      console.log("Account store loggedIn is: ");
      console.log(this.accountStore.loggedIn);
      if (this.accountStore.loggedIn) {
        this.navigateToMap();
      } else {
        alert("Sign up failed!");
        console.log("Sign up failed!");
      }});
  }
  /*/ ACCOUNT ACTIONS */

  /** FORM VALIDATORS */
  valFirstName() {
      var re = /^[A-Za-z ]+$/;
      return re.test(this.state.fn);
  }
  valLastName() {
    var re = /^[A-Za-z ]+$/;
    return re.test(this.state.ln);
  }
  valEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }
  valPassword() {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(this.state.pw);
  }
  /*/ FORM VALIDATORS */


  /** FORM PART */
  formPart = () =>
    <Form style={{alignItems:'center'}}>
        <Item Left>
            <Input onChangeText={(text) => this.setState({fn: text})} placeholder="First Name" />
        </Item>
        <Item Right>
            <Input onChangeText={(text) => this.setState({ln: text})} placeholder="Last Name" />
        </Item>
        <Item>
            <Input onChangeText={(text) => this.setState({email: text})} ref="eMail" placeholder="Email" />
        </Item>
        <Item last>
            <Input onChangeText={(text) => this.setState({pw: text})} placeholder="Password" />
        </Item>
        <Button block danger onPress={() => this.signUpWrapper()}><Text>Sign up!</Text></Button>
        </Form>
  ;

  /*/ FORM PART */
  //<Text>{this.state.fn}</Text>

  render() {
    return (
      <Container>
                <Content>
                  {this.formPart()}
                    <Text>Hello</Text>
                </Content>
            </Container>
          );
    //
  }
}

AppRegistry.registerComponent('SignupComponent', () => SignupComponent);
