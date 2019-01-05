import React from 'react';
import { ActivityIndicator, FlatList, View, ScrollView, Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import firebase from 'firebase';

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    //Android viser en warning med en timer. Dette får RN til at ignorere fejlen. Der kan læses mere om fejlen her 
    // https://github.com/firebase/firebase-js-sdk/issues/97 
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
  }

  static navigationOptions = {
    title: "List",
    headerStyle: {
      backgroundColor: '#171F33',
      },
      headerTitleStyle: {
      color: '#fff'
      }
      };

  handleSearch = text => {
    const result = this.state.data.filter(item => {
      if (item.title.includes(text) || item.title.includes(text)) {
        return item; 
      }
    })
    this.setState ({dataSource: result, 
                    text: text})
  };
  
  handleOnClear = () => { 
    const clearData = this.state.data
    this.setState({dataSource: clearData, text: ""})
  }; 

  componentDidMount() {
    this.getLiqourFromApiAsync();
  }

  getLiqourFromApiAsync() {
    var that = this;
    return firebase
    .database()
    .ref('liquors')
    .on('value', function (snapshot) {
        var liquors = Object.values(snapshot.val());
        //Det er her vi henter vores data fra liquors

        var typeID = liquors[0].type;
        //Lav et nyt database-kald:
        firebase.database().ref('types/' + typeID).once('value', function (snapshotType) {
        
          that.setState({
            isLoading: false,
            data: liquors,
            dataSource: liquors,
          });
          return liquors;
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style = {{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <SearchBar 
          clearIcon={{ color: 'white' }}
          value={this.state.text}
          onChangeText={this.handleSearch}
          onClear={this.handleOnClear}
          placeholder="Search here..."
          />
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
              <ListItem
                avatar={
                  <Image
                    style={{ width: 65, height: 65 }}
                    source={{ uri: item.image }} 
                  />
                }
                  title={item.title}
                  titleStyle={{ color: 'tomato', fontWeight: 'bold' }}
                  subtitleStyle={{ color: 'tomato' }}
                  subtitle={item.type}
                  chevronColor='tomato'
                  onPress={() => this.props.navigation.navigate('Details', item)}
                  containerStyle={{ backgroundColor: 'white' }}
              />
              }
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
      </View>
    );
  }
}