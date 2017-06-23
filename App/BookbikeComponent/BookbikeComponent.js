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

import Spinner from 'react-native-loading-spinner-overlay';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import {Button} from 'native-base';

import {getUserStore} from '../UserStore.js';

@observer
export default class BookbikeComponent extends Component {

  constructor(props) {
    super(props);
    this.userStore = getUserStore();
  }

  componentDidMount() {
    console.log("MapComponent did mount!");
    this.userStore.getCurLocation();
    this.userStore.watchCurLocation();
  }

  componentWillUnmount() {
    console.log("MapComponent will unmount!");
    this.userStore.clearWatch();
  }

  updateBookedBikeBegin() {
    this.userStore.bookInterestedBike()
    .then(() => this.navigateToSuccessBookedBike());
  }

  navigateToSuccessBookedBike() {
    console.log("Bike booked");
    this.props.navigator.push({
      screen: "rnswyssbike.SuccessBookedBike",
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
          <Spinner visible={this.userStore.spinnerVisible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          <Button danger onPress={(coord, pos) => this.updateBookedBikeBegin()}><Text>Book this bike!</Text></Button>
        </View>
       </View>
      </View>);
  }
}

AppRegistry.registerComponent('BookbikeComponent', () => BookbikeComponent);
