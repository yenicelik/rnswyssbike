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

import {Button} from 'native-base';
import {startMainApp} from './../commons.js';

export default class FeedbackComponent extends Component {

  static navigatorStyle = {
    navBarHideOnScroll: false,
  };

  constructor(props) {
    super(props);
  }

  navigateToMapView(){
    //Toast first
    Alert.alert(
      'Feedback submitted',
      'Thanks a lot!',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
    startMainApp();
  }

//<PushButtonCell ref='push' title='Push me!'/>
  render() {
    return (<View style={{flex:1}}>
      <Form
        ref='registrationForm'>
        <InputField ref='last_name' placeholder='Last Name'/>
        <InputField ref='issue_field' placeholder='Tell us your issue'/>
        <InputField ref='submit' placeholder='Submit'/>
        <Button danger onPress={(coord, pos) => this.navigateToMapView()}><Text>Submit!</Text></Button>
        <InputField ref='call_us' placeholder='Call us'/>
        </Form>
      </View>);
  }
}

//Let submit redirect to the map page

AppRegistry.registerComponent('FeedbackComponent', () => FeedbackComponent);
