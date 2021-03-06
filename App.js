import React from 'react';
import { StyleSheet,  View, ActivityIndicator, Text, StatusBar } from 'react-native';
import firebase from 'firebase'; 
import LoginForm from './components/LoginForm'; 
import TabBar from './components/pages/TabBar';

export default class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    loggedIn: null
  }
}

componentWillMount() {
  firebase.initializeApp({
    apiKey: "AIzaSyCnEaTaSYMYafEqyoJj5HpPDhxUEGGcFhk",
    authDomain: "fineliquors-20a7f.firebaseapp.com",
    databaseURL: "https://fineliquors-20a7f.firebaseio.com",
    projectId: "fineliquors-20a7f",
    storageBucket: "fineliquors-20a7f.appspot.com",
    messagingSenderId: "348822207623"
  });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
  });
}

render() {
  switch (this.state.loggedIn) {
    case true:
      return (
        //Vi har statusbar for at skaffe os den rigtige farve i toppen af appen 
        <View style={styles.container}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
          <TabBar /> 
        </View>
      );
    case false: 
      return (
        <View style={styles.container}>
          <LoginForm />
        </View>
      );
    default: 
      return <ActivityIndicator size="large" />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

