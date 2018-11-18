import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements';



export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
    static navigationOptions = {
      title: "Albums"
    };

    componentDidMount(){
      this.getAlbumsFromApiAsync();
    }

    getAlbumsFromApiAsync() {
      return fetch('http://rallycoding.herokuapp.com/api/music_albums')
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState({
        dataSource: responseJson
      });

    })
    .catch((error) => {
      console.error(error);

    });
  }

    render() {
      return (
       <FlatList
       data={this.state.dataSource}
       renderItem={({ item}) => 
          <ListItem
          avatar={
            <Image
            style={{width: 65, height: 65}}
            source={{uri: item.image}} />
          }
          title={item.title}
          titleStyle={{color: 'black', fontWeight: 'bold'}}
          subtitleStyle={{color: 'black'}}
          subtitle={item.artist}
          chevronColor='black'
          onPress={() => alert("Album trykket på: " + item.title )}
          containerStyle={{backgraoundColor: 'white'}}
          />
      }
     
      keyExtractor={(item, index) => index.toString()}
       />
        );
      }
    }  
  