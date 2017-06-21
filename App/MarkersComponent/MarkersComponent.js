import React, { Component } from 'react';
import {observable, computed, autorun} from 'mobx';
import {observer} from 'mobx-react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableHighlight
} from 'react-native';
import {Button, Text} from 'native-base';
import MapView from 'react-native-maps';
import BookbikeComponent from '../BookbikeComponent/BookbikeComponent';
import { Navigation } from 'react-native-navigation';

import {Fb} from '../firebase.js';
import {fbMarkers} from './MarkersStore.js';

import {userStore} from '../UserStore.js';


const renderingMarkers = [{
  longitude: 8.645592,
  latitude: 47.366465,
  description: "Bike 1",
  title: "Bike 1"
},
{
  longitude: 8.545892,
  latitude: 47.466365,
  description: "Bike 2",
  title: "Bike 2"
}
];

@observer
export default class MarkersComponent extends Component {

  markers = [];

  constructor(props) {
    console.log("In markers...");
    super(props);

    setInterval(() => {
      this.markers = fbMarkers.getValidMarkers;
      console.log("Markers were updated!");
      console.log(this.markers)
    }, 5000);
  }

  startBookingBike(bikeNo) {
    if (userStore.bookedBikeNo === -1) {
      userStore.setInterestBikeNo(bikeNo);
      this.navigateToBookBike();
    } else {
      alert("You are already biking!");
    }
  }

  /** NAVIGATORS */
  navigateToBookBike() {
    this.props.navigator.push({
      screen: "rnswyssbike.BookbikeComponent",
    });
  }

  updateComponent = autorun(() => {
    fbMarkers.markers.slice();
    this.forceUpdate();
  });

  /*/ NAVIGATORS */
  // LayoutAnimation.spring()
  render() {
    var renderingMarkers = fbMarkers.getValidMarkers || [];
    console.log("fbMarkers are: ");
    console.log(fbMarkers.markers.slice());
    console.log("Rendering stuff..");
    console.log(renderingMarkers);
    console.log("Rendering ALL the stuff!");
    return (<View>
      {renderingMarkers.map( (marker) => {
      console.log("Markers are being rendered...");
      console.log(JSON.stringify(marker));
        console.log("Global key is: " + String(this.globalKey));
          console.log("Printing marker number");
          console.log(marker.bike_no);
          return (
            <MapView.Marker
            navigator={this.props.navigator}
            key={marker.bike_no}
            coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
            title={marker.title}
            description={marker.description}
            onPress={(coord, pos) => this.startBookingBike(marker.bike_no)}
            ><View style={styles.bikeRadius}><View style={styles.bikeMarker}>
            </View></View>
            </MapView.Marker>
          );
    })}</View>)
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
    borderWidth: 4,
    borderColor: 'rgba(0, 122, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#rgba(255, 255, 255, 0.05)'
  },
  bikeRadius: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 122, 0, 0.5)',
    borderWidth: 4,
    borderColor: 'rgba(255, 122, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bikeMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#rgba(255, 255, 255, 0.05)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('MarkersComponent', () => MarkersComponent);
