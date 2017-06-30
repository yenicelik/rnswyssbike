import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
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
  Alert
} from 'react-native';
import {startMainApp} from './../commons.js';

// import { Form,
//   Separator,InputField, LinkField,
//   SwitchField, PickerField,DatePickerField,TimePickerField
// } from 'react-native-form-generator';

import { Container, Content, Form, Item, Input, Button } from 'native-base';

import {getAccountStore} from './AccountStore.js';

import {
  StackNavigator,
} from 'react-navigation';

export default class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.accountStore = getAccountStore();
    this.state = {
      email: '',
      pw: '', //should this be hidden somehow?
    }

    // if (this.accountStore.loggedIn) {
    //   this.navigateToMap();
    // } else {
    //   alert("No local account data found, need to log-in manually!");
    //   console.log("No local account data found, need to log-in manually!");
    // };
  }

  /** DATABASE ACTIONS */
  naiveLogin() { //Not sure if the 'async' flag before is necessary
    if (!this.valEmail()) {
      alert("Email format is not valid");
      return false;
    }
    if (!this.valPassword()) {
      alert("Password must be 8 characters long, contain one uppercase, one lowercase character, and a number")
      return false;
    }
    this.accountStore.login(this.state.email, this.state.pw)
    .then( () => {
      if (this.accountStore.loggedIn) {
        this.navigateToMap();
      } else {
        alert("Log in failed!");
        console.log("Login up failed!");
      }});
  }
  /*/ DATABASE ACTIONS */

  /** FORM VALIDATORS */
  valEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }
  valPassword() {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(this.state.pw);
  }
  /*/ FORM VALIDATORS */

  /** NAVIGATORS **/
  navigateToSignUp(){
    this.props.navigator.push({
      screen: "rnswyssbike.SignupComponent",
    });
  }

  navigateToMap() {
    startMainApp();
  }
  /*/ NAVIGATORS **/

//<PushButtonCell ref='push' title='Push me!'/>
  render() {
    return (
      <Container>
                <Content>
                    <Form style={{alignItems:'center'}}>
                        <Item>
                            <Input onChangeText={(text) => this.setState({email: text})} placeholder="Email" />
                        </Item>
                        <Item last>
                            <Input secureTextEntry={true} onChangeText={(text) => this.setState({pw: text})} placeholder="Password" />
                        </Item>
                        <Button block danger onPress={() => this.naiveLogin()}><Text>Log In!</Text></Button>
                        <Button block warning><Text>Facebook Login</Text></Button>
                        <Button block warning><Text>Google Plus Login</Text></Button>
                        <Button block danger onPress={() => this.navigateToSignUp()}><Text>Sign up</Text></Button>
                        <Button block danger onPress={() => this.navigateToMap()}><Text>Go to map</Text></Button>
                    </Form>
                </Content>
            </Container>
    );
  }
}

AppRegistry.registerComponent('LoginComponent', () => LoginComponent);
