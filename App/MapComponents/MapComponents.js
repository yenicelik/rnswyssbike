/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  ListView
} from 'react-native';

import { Provider as MobXProvider, observer, inject } from 'mobx-react/native';
import { Store } from '../Store.js';

import { Navigation } from 'react-native-navigation';

import {Container, Content, Badge, Text, Card, CardItem, Button, Fab, Icon, Tab, Tabs} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import MapView from 'react-native-maps';
import MarkersComponent from '../MarkersComponent/MarkersComponent.js';
import FeedbackComponent from '../FeedbackComponent/FeedbackComponent.js';

const {
  width,
  height
} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1 //0.00322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapComponents extends Component {

  /** GPS STUFF */
  gpsPosLat = 0;
  gpsPosLng = 0;
  watchID = null;

  getCurLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
      this.setState({
        usrLat: lat,
        usrLng: lng
      });
    }, (error) => alert(JSON.stringify(error)), {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000
    });
  }

  watchCurLocation() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("Recording GPS data!");
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
      this.setState({
        usrLat: lat,
        usrLng: lng,
      }, (error) => console.log(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      });
    });
  }

  clearWatch() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  /*/ GPS STUFF */

  constructor(props) {
    super(props);

    this.state = {
      usrLat: 47.367601,
      usrLng: 8.545226,
    }

    this.cityBorders= [{
      latitude:47.367601,
      longitude:8.545226
    },
    {
      latitude:47.366009,
      longitude:8.545269
    },
    {
      latitude:47.363266,
      longitude:8.543429
    },
    {
      latitude:47.368234,
      longitude:8.540321
    }];

    this.markers= [{
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
  }

  /** NAVIGATORS */
  navigateToEndBookBike(){
    console.log("End booked bike!");
    this.props.navigator.push({
      screen: "rnswyssbike.EndBookedBike",
    });
  }
  /*/ NAVIGATORS */

  componentDidMount() {
    console.log("MapComponent did mount!");
    this.getCurLocation();
    this.watchCurLocation();
  }

  componentWillUnmount() {
    console.log("MapComponent will unmount!");
    this.clearWatch();
  }


  centerToUser() {
    //Implement function that changes 'map current location' to the user's location
    console.log("Centering to user..");
  }

  //HUD consists of Code, 'Stop riding' and Bike Number (Bike ID)
  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsMyLocationButton={true}
          style={styles.map}
          region={{
              latitude: this.state.usrLat,
              longitude: this.state.usrLng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
        >
        <MapView.Polygon
        coordinates={this.cityBorders}
        strokeColor="rgba(100, 200, 150, 0.5)"
        fillColor="rgba(100, 200, 150, 0.2)"
        >
        </MapView.Polygon>

          <MapView.Marker coordinate={{latitude: this.state.usrLat, longitude: this.state.usrLng}}>
            <View style={styles.radius}>
              <View style={styles.marker}></View>
            </View>
          </MapView.Marker>
        </MapView>

        <MarkersComponent navigator={this.props.navigator}>
        </MarkersComponent>


        <View style={{flex: 1, justifyContent: 'space-between', bottom: 0, position: 'absolute', width: '100%'}}>
          <Button disabled full style={{width: '100%', backgroundColor: '#039BE5'}}><Text>Unlock Code: 4391</Text></Button>
          <Button disabled full style={{width: '100%', backgroundColor: '#03A9F4'}}><Text>Duration: 1 minute</Text></Button>
          <Button full style={{width: '100%', backgroundColor: '#ff867c'}} onPress={() => this.navigateToEndBookBike()}><Text>Stop riding</Text></Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  box1: {
   position: 'absolute',
   top: 40,
   left: 40,
   width: 100,
   height: 30,
   backgroundColor: 'rgba(36, 202, 255, 0.3)',
   borderRadius: 10
 },
  grid: {
    position: 'absolute'
  },
  hud: {
    position: 'absolute',
    height: 50
  },
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

AppRegistry.registerComponent('MapComponents', () => MapComponents);
