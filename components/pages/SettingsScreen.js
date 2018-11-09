import React from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native'; 

export default class SettingsScreen extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      isLoading: true
    }
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
    static navigationOptions = {
      title: "Settings",
    };
      render() {
        return (
            <View>
              <Text>Hej SettingsScreen</Text>
            </View>
        );
      }
    };
