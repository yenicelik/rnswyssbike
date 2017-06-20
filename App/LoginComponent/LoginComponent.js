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

import firebase from '../firebase';

// import { Form,
//   Separator,InputField, LinkField,
//   SwitchField, PickerField,DatePickerField,TimePickerField
// } from 'react-native-form-generator';

import { Container, Content, Form, Item, Input, Button } from 'native-base';


import {
  StackNavigator,
} from 'react-navigation';

export default class LoginComponent extends Component {

  constructor(props) {
    super(props);
  }

  /** DATABASE ACTIONS */
  async naiveLogin(email, pass) { //Not sure if the 'async' flag before is necessary
    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, pass)
        .then((userData) => {
          console.log(JSON.stringify(userData));
        });
        console.log("Logged In!");
        return true;
    } catch (error) {
      console.log(error.toString());
      alert('Login Failed. Please try again'+error.toString());
      return false;
    }
  }
  /*/ DATABASE ACTIONS */

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
                            <Input placeholder="Username" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" />
                        </Item>
                        <Button block danger
                        onPress={this._emailPassLogin}><Text>Log In!</Text></Button>
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
