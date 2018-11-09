import React from 'react';
import firebase from 'firebase'; 
import { View, Text } from 'react-native'; 

export default class AddNewsScreen extends React.Component {
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
      title: "AddNew",
    };
      render() {
        return (
            <View>
              <View>
               <Text>Hej AddNewScreen</Text>
              </View>
            </View>
        );
      }
  };