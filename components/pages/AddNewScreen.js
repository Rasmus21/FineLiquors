import React from 'react';
import {View, Button, StyleSheet, Text, TextInput} from 'react-native';
import firebase from 'firebase';

export default class AddNewScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      liquor: '',
      title: '',
      error: '',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41j7-7yboXL.jpg'
    }
  }

  static navigationOptions = {
    title: "Tilføj anmeldelse"
  };

  
    writeLiquor(){
      const liquor = this.state.liquor;
      const title = this.state.title;
      const image = this.state.image;

      firebase.database().ref('Liquor/').push({
          liquor,
          title,
          image
      }).then((data)=>{
          alert("Anmeldelse succesfuld");
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
  }

  render() {
    return (
        <View style={styles.container}>
           <TextInput
          label='Liquor'
            placeholder='Liquor'
            value={this.state.liquor}
            onChangeText={liquor => this.setState({ liquor })}
          />
          <TextInput
            label='Flaskens Titel'
            placeholder='Flaskens Titel'
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TextInput editable={false} value={this.state.image}/>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
            <Button title='Tilføj anmeldelse' onPress={this.writeLiquor.bind(this)}/>



        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});