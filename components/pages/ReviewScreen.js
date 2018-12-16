import React from 'react';
import {View, Button, StyleSheet, Text, TextInput} from 'react-native';
import firebase from 'firebase';
import StarRating from 'react-native-star-rating';

export default class AddNewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      type: '',
      barcode: '',
      title: '',
      error: '', 
      text: '',
      searchInput: '', 
      starCount: 2.5
    };
  }

  writeLiquor(){
      const type = this.state.type;
      const barcode = this.state.barcode;
      const title = this.state.title;
      const text = this.state.text;
      const starCount = this.state.starCount; 
      firebase.database().ref('liquors/').push({
          type,
          barcode,
          title,
          text,
          starCount
      }).then((data)=>{
          alert("Anmeldelse succesfuld");
          clearText(); 
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
        <View style={styles.container}>
            <View>
              <Text h1 style={styles.headline}>Review</Text>
            </View>
            <View style={styles.input}>
              <TextInput
              label='Which type of liqour is it?'
              placeholder='Liquor name'
              value={this.state.type}
              onChangeText={type => this.setState({ type })}
              ref={component => this._textInput = component}
              writeLiquor={() => {
                 this.clearText()
               }}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                label='Bottle Title'
                placeholder='Bottle title'
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
                ref={component => this._textInput = component}
                writeLiquor={() => {
                   this.clearText()
                 }}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                label='Barcode'
                placeholder='Barcode number'
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
                ref={component => this._textInput = component}
                writeLiquor={() => {
                   this.clearText()
                 }}
              />
            </View>
            <View style={styles.input1}>
              <TextInput
                label='Review'
                placeholder='Review'
                value={this.state.text}
                onChangeText={text => this.setState({ text })} 
                ref={component => this._textInput = component}
                writeLiquor={() => {
                   this.clearText()
                 }}
              />
            </View>
            <View style={styles.input2}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={8}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={'red'}
              />
            </View>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
            <Button title='Submit' onPress={this.writeLiquor.bind(this)}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  headline: {
    fontSize: 40, 
    alignSelf: 'center', 
    alignItems: 'stretch'
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
    padding: 10 
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
    height: 200
  },
  input2: {
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
  buttonContainer: {
    backgroundColor: '#9FB4C4',
    paddingVertical: 5
  },
  buttonText: {
    color: '#06121C',
    textAlign: 'center',
    fontWeight: '700'
  },
});
