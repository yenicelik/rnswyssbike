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


import {
  StackNavigator,
} from 'react-navigation';

export default class LoginComponent extends Component {

  constructor(props) {
    super(props);
  }

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

  /** LOGIN FUNCTORS **/
  _emailPassLogin(){
    // Log in and display an alert to tell the user what happened.
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
        this.setState({
                loading: false
              });
              AsyncStorage.setItem('userData', JSON.stringify(userData));
              this.props.navigator.push({
                component: Account
              });
      }
    ).catch((error) =>
        {
              this.setState({
                loading: false
              });
        alert('Login Failed. Please try again'+error);
    });
  }

  /*/ LOGIN FUNCTORS **/

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
