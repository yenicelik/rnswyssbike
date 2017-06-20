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

import {bookingStore} from '../BookingStore.js';


export default class BookbikeComponent extends Component {

  constructor(props) {
    super(props);
  }

  updateBookedBikeBegin() {
    bookingStore.bookBike();
    this.navigateToSuccessBookedBike();
  }

  navigateToSuccessBookedBike() {
    console.log("Bike booked");
    this.props.navigator.push({
      screen: "rnswyssbike.SuccessBookedBike",
      passProps: {
        bike_no: this.props.bike_no
      }
    });
  }

//<PushButtonCell ref='push' title='Push me!'/>
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{marginTop: 22}}>
        <View>
          <Text>Bike ID: 6731</Text>
            <Text>CHF 0.99 / 30min.</Text>
          <Button danger onPress={(coord, pos) => this.navigateToSuccessBookedBike()}><Text>Book this bike!</Text></Button>
        </View>
       </View>
      </View>);
  }
}

AppRegistry.registerComponent('BookbikeComponent', () => BookbikeComponent);
