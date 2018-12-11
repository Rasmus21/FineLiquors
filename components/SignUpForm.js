import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import firebase from 'firebase'; 
import { CheckBox } from "react-native-elements";

export default class SignUpForm extends React.Component {
constructor(props) {
    super(props); 
    this.state = {
        email: '',
        password: '',
        loading: false
    }
}

onButtonPress() {
    const { email, password } = this.state; 
    this.setState({
        error: '', 
        loading: true
    }); 
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onSignUpSuccess.bind(this))
            .catch(this.onSignUpFailed.bind(this));
}

onSignUpSuccess() {
    this.setState({
        email: '', 
        password: '', 
        loading: false, 
        error: '' }); 
    alert("User created successfully"); 
} 

onSignUpFailed(err) { 
    this.setState({
        loading: false,
        error: err.message });
}

    render() {
        return (
          <View>
            <TextInput style={styles.container} 
            label='Username' 
                placeholder='user@gmail.com'
                placeholderTextColor='#060606'
                value={this.state.email} 
                onChangeText={email => this.setState({ email })}
            />
            <TextInput style={styles.container}
                placeholder='password'
                placeholderTextColor='#060606'
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
            />
            <CheckBox
                center
                title='18 or older?'
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}
            />
            <Text style={StyleSheet.errorTextStyle}>
              {this.state.error}
            </Text>
            {this.renderButton()}
          </View>
        );
    }
    
    renderButton() {
        if(this.state.loading) {
            return <ActivityIndicator size='small' />
        }
        return (
            <Button title="Sign up" onPress={this.onButtonPress.bind(this)}>
            </Button>
        );
      }
    }

    const styles = StyleSheet.create({
        container: {
            height: 40,
            backgroundColor: '#98999A',
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            padding: 10,
            color: '#060606'
        },
        container1: {
            alignItems: 'center',
        }
      });
  
