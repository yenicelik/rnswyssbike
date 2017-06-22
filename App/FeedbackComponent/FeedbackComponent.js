'use strict';

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
  Alert
} from 'react-native';

//import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import {phonecall, email} from 'react-native-communications';

import {Button} from 'native-base';
import {startMainApp} from './../commons.js';

export default class FeedbackComponent extends Component {

  static navigatorStyle = {
    navBarHideOnScroll: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      body: "",
    }
  }

  navigateToMapView(){
    //Toast first
    Alert.alert(
      'Feedback submitted',
      'Thanks a lot!',
      [
        {text: 'OK', onPress: () => {
          console.log('OK Pressed');
          startMainApp();}
        },
      ],
      { cancelable: false }
    )
  }

  /** SENDERS */
  emailUs() {
    this.state.body = this.escapeRegExp(this.state.body);
    this.state.subject = this.escapeRegExp(this.state.subject);
    var respondantPerson = (Math.random() <= 0.5) ? "michael@swyssbike.ch" : "david@swyssbike.ch";
    email([respondantPerson], [], [], this.state.subject, this.state.body);
  }

  callUs() {
    // phonecall("0763097660", true);
    phonecall("0786061184", false);
  }
  /*/ SENDERS */

  /** SANITIZER */
  escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  /*/ SANITIZER */

  render() {
    return (<View style={{flex:1}}>
      <Form
        ref='registrationForm'>
        <InputField onChangeText={(text) => this.setState({subject: text})} placeholder='Subject Line'/>
        <InputField onChangeText={(text) => this.setState({body: text})} placeholder='Feedback here'/>
        <Button danger onPress={() => this.emailUs()}><Text>Submit!</Text></Button>
        <Button info onPress={() => this.callUs()}><Text>Call us!</Text></Button>
        </Form>
      </View>);
  }
}

//Let submit redirect to the map page

AppRegistry.registerComponent('FeedbackComponent', () => FeedbackComponent);
