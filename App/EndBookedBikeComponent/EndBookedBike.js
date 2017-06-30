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

import {Button} from 'native-base';

import {getUserStore} from '../UserStore.js';

@observer
export default class EndBookedBike extends Component {

  constructor(props) {
    super(props);
    this.userStore = getUserStore();
  }

  updateBookedBikeEnd() {
    this.userStore.endRidingBike().then(
        this.navigateToRideComplete()
    );
  }

  /** NAVIGATOR ACTIONS */
  navigateToRideComplete(){
    this.props.navigator.showModal({
      screen: "rnswyssbike.RideComplete"
    });
  }
  /*/ NAVIGATOR ACTIONS */

//<PushButtonCell ref='push' title='Push me!'/>
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{marginTop: 22}}>
        <View>
          <Text>Lock the Bike with ID: 6731</Text>
          <Button danger onPress={(coord, pos) => this.updateBookedBikeEnd()}><Text>Locked!</Text></Button>
        </View>
       </View>
      </View>);
  }
}

AppRegistry.registerComponent('EndBookedBike', () => EndBookedBike);
