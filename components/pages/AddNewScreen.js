import React from 'react';
import {View, Button, StyleSheet, Text, TextInput} from 'react-native';
import firebase from 'firebase';

export default class AddNewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      type: '',
      title: '',
      error: '',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41j7-7yboXL.jpg', 
      text: '',
    }
  }
  static navigationOptions = {
    title: "Tilføj anmeldelse"
  };
  
    writeLiquor(){
      const type = this.state.type;
      const title = this.state.title;
      const image = this.state.image;
      const text = this.state.text;
      firebase.database().ref('liquors/').push({
          type,
          title,
          image,
          text
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
            <View style={styles.input}>
              <TextInput
              label='Hvilen type af sprut drejer det sig om?'
              placeholder='Sprut navn'
              value={this.state.tupe}
              onChangeText={type => this.setState({ type })}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                label='Flaskens Titel'
                placeholder='Flaskens Titel'
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </View>
            <View style={styles.input1}>
              <TextInput
                label='Anmeldelse'
                placeholder='Anmeldelse'
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
              />
            </View>
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
  },
  input: {
    alignItems: 'stretch', 
    backgroundColor: '#98999A',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10, 
  },
  input1: {
    alignItems: 'stretch', 
    backgroundColor: '#98999A',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10, 
    height: 200,
  },
  buttonContainer: {
    backgroundColor: '#9FB4C4',
    paddingVertical: 5
  },
  buttonText: {
    color: '#06121C',
    textAlign: 'center',
    fontWeight: '700'
  } 
});
