import React, { Component } from 'react';
import {observer} from 'mobx-react';

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
  TouchableHighlight
} from 'react-native';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import firebase from '../firebase';

import {startMainApp} from './../commons.js';

import {Button} from 'native-base';

@observer
export default class RideComplete extends Component {

  constructor(props) {
    super(props);
  }

  /** DATABASE ACTIONS */


  /*/ DATABASE ACTIONS */

  /** NAVIGATORS */
  navigateToFeedbackPage() {
    this.props.navigator.push({
      screen: "rnswyssbike.FeedbackComponent",
    });
  }
  /*/ NAVIGATORS */

  backToMap() {
    startMainApp();
  }

//<PushButtonCell ref='push' title='Push me!'/>
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{marginTop: 22}}>
        <View>
          <Text>Ride Complete!</Text>
          <Text>Duration: 5 minutes</Text>
          <Text>Calories burned: 500kCal</Text>
          <Text>Cost: 99chf</Text>
          <Text>
            How was your ride?
          </Text>
          <Button success title="Good" onPress={() => this.backToMap()}><Text>Good</Text></Button>
          <Button danger title="Bad" onPress={() => this.navigateToFeedbackPage()}><Text>Bad</Text></Button>
        </View>
       </View>
      </View>);
  }
}

AppRegistry.registerComponent('RideComplete', () => RideComplete);
