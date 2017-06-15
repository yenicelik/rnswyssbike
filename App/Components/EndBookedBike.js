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
  TouchableHighlight
} from 'react-native';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import {Button} from 'native-base';

export default class EndBookedBike extends Component {

  constructor(props) {
    super(props);
  }

  navigateToRideComplete(){
    this.props.navigator.showModal({
      screen: "rnswyssbike.RideComplete"
    });
  }

  backToMap() {
    this.props.navigator.popToRoot({
      animated: true // does the pop have transition animation or does it happen immediately (optional)
    });
  }

//<PushButtonCell ref='push' title='Push me!'/>
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{marginTop: 22}}>
        <View>
          <Text>Lock the Bike with ID: 6731</Text>
          <Button danger onPress={(coord, pos) => this.navigateToRideComplete()}><Text>Locked!</Text></Button>
        </View>
       </View>
      </View>);
  }
}

AppRegistry.registerComponent('EndBookedBike', () => EndBookedBike);
