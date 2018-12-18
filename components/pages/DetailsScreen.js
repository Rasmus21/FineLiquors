import React from 'react';
import {View, Button, Text } from 'react-native';

export default class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: "Details",
    headerStyle: {
      backgroundColor: '#171F33',
      },
      headerTitleStyle: {
      color: '#fff'
      }
      };

  render() {
    const {navigation} = this.props;
    const type = navigation.getParam('type', 'No type');
    const title = navigation.getParam('title', 'No title defined');
    const text = navigation.getParam('text', 'No text defined');
    const starCount = navigation.getParam('starCount', 'No starCount defined'); 

    return (
        <View>
          <Text>Type of alchohol : {type}</Text>
          <Text>Title of the bottle : {title}</Text>
          <Text>Review : {text}</Text>
          <Text>Number of starts given: {starCount}</Text>
        </View>
    );
  }
}