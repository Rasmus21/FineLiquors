import React from 'react';
import {View, Button, Text } from 'react-native';
import firebase from 'firebase';

export default class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: "Details"
  };



  render() {
    const {navigation} = this.props;
    const type = navigation.getParam('type', 'No type');
    const title = navigation.getParam('title', 'No title defined');
    const text = navigation.getParam('text', 'No text defined');

    return (
        <View>
          <Text>Type af alkohol : {type}</Text>
          <Text>Titlen på flasken er : {title}</Text>
          <Text>Anmeldelse : {text}</Text>
        </View>
    );
  }
}