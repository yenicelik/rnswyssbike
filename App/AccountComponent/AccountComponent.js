import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  ListView,
  TextInput,
  Switch,
  Slider,
  Picker,
  Modal,
  TouchableHighlight
} from 'react-native';

import { Container, Content, List, ListItem, Text, Button} from 'native-base';
import Spinner from 'react-native-spinkit';


export default class AccountComponent extends Component {

  static navigatorStyle = {
    navBarHideOnScroll: false,
  };

  constructor(props) {
    super(props);

    this.state= {
      selectedScreen: 0,
      modalVisible: false,
      loadingVisible: true
    }

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (<Container>
      <List>
      <ListItem>
      <Text>Name</Text>
      </ListItem>
      <ListItem>
      <Text>email</Text>
      </ListItem>
      <ListItem>
      <Button>
        <Text>
          Logout
        </Text>
      </Button>
      </ListItem>
      </List>
      <Content></Content></Container>);
  }
}

AppRegistry.registerComponent('AccountComponent', () => AccountComponent);
