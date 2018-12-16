import React from 'react';
import { ActivityIndicator, FlatList, View, Button, Image } from 'react-native';
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
    title: "List"
  };

  handleSearch = text => {
    const result = this.state.data.filter(item => {
      if (item.title.includes(text) || item.type.includes(text)) {
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
        //Brug artist ID til at hente fulde navn og erstat dataen. 
        //Da dataen i øvelserne kun er fra Taylor Swift, går vi bare ind i første object i Arrayet, 
        //da vi ved alle objekter har samme artist. Er der forskellige, kan man loope igennem arrayet og erstatte variabler

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
      </View>
    );
  }
}