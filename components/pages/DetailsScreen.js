import React from 'react';
import { View, Text } from 'react-native'; 

export default class DetailssScreen extends React.Component {
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
      title: "Home",
    };
      render() {
        return (
            <View>
              <Text>Hej Details</Text>
            </View>
        );
      }
  };