import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import firebase from 'firebase'; 
import SignUpForm from './SignUpForm';

export default class LoginForm extends React.Component {
constructor(props) {
    super(props); 
    this.state = {
        email: '',
        password: '',
        error: '', 
        loading: false,
        hasLogin: true
    }
}

signIn() {
    const { email, password } = this.state; 
    this.setState({
        error: '', 
        loading: true
    }); 
    firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
}

onLoginSuccess() {
    this.setState({
        email: '',
        password: '',
        loading: false,
        error: '' }); 
}

onLoginFail(err) {
    this.setState({
        loading: false,
        error: err.message });
}

    render() {
        switch (this.state.hasLogin) {
            case true: 
                return (
                    <View style={styles.container}>
                        <Text style={styles.buttonText}> Log in here: </Text>
                        <TextInput style = {styles.input}
                            label='Username'
                            placeholder='user@gmail.com'
                            placeholderTextColor='#060606'
                            value={this.state.email} 
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput style = {styles.input}
                            placeholder='password'
                            placeholderTextColor='#060606'
                            value={this.state.password}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        />    
                    
                        <Text style={StyleSheet.errorTextStyle}>
                            {this.state.error}
                        </Text>      
                      
                        
                        {this.renderButton()}

                            
                      
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}> If you haven’t signed up yet, do this here: </Text>
                                <Button title='SignUp' onPress={() => this.setState({hasLogin : false })}>
                            </Button>
                        </View>

                    </View>
                );    
            case false: 
                return (
                    <View>
                        <SignUpForm />
                        <Button title="Go back" onPress={() => this.setState({hasLogin : true})}/>
                        //Denne knap bruges til at navigere tilbage til SignUp
                    </View>
                );
            default: 
                    return <ActivityIndicator size='small' />
        }
    }

renderButton() {
    if(this.state.loading) {
        return <ActivityIndicator size='small' />
    }
    return (
            <Button title="LOGIN" onPress={this.signIn.bind(this)}>
            </Button>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    errorTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#F70808'
    },
    input: {
        height: 40,
        backgroundColor: '#98999A',
        marginBottom: 10,
        padding: 10,
        color: '#060606'
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
