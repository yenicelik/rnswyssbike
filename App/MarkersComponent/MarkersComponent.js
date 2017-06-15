import React, { Component } from 'react';
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

import firebase from '../firebase';


const markers = [{
  longitude: 8.545592,
  latitude: 47.366465,
  description: "Bike 1",
  title: "Bike 1"
},
{
  longitude: 8.545892,
  latitude: 47.366365,
  description: "Bike 2",
  title: "Bike 2"
}
];

export default class MarkersComponent extends Component {

  constructor(props) {
    console.log("In markers...");
    super(props);

    this.bikesRef = firebase.database().ref().child('/bikes/');

    this.state={
      askForBooking: false,
    }
  }

  /** DATABASE ACTIONS */
  listenForBikes() {
    var localMarkers;
    bikesRef.on('value', (snap) => {
      localMarkers = [];
      snap.forEach((child) => {
        localMarkers.push({
          title: child.val().bike_no,
          description: "Bike2",
          current_user: child.val().current_user,
          latitude: parseFloat(child.val().positionLat),
          longitue: parseFloat(child.val().positionLng),
          _key: child.key
        })
      })
    });

    this.setState({
      markers: localMarkers,
    });

  }
  /*/ DATABASE ACTIONS */

  setAskForBooking(askForBookingState){
    this.setState({askForBooking: askForBookingState})
  }

  /** NAVIGATORS */
  navigateToBookBike() {
    this.props.navigator.push({
      screen: "rnswyssbike.BookbikeComponent",
    });
  }
  /*/ NAVIGATORS */



  render() {
    return (<View>
      {markers.map( (marker, index) => {
      console.log(JSON.stringify(marker));
      return (
      <MapView.Marker
      navigator={this.props.navigator}
      key={index}
      coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
      title={marker.title}
      description={marker.description}
      onPress={(coord, pos) => this.navigateToBookBike()}
      ><View style={styles.bikeRadius}><View style={styles.bikeMarker}>
      </View></View></MapView.Marker>
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
