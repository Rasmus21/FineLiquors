import React from 'react';
import { StyleSheet, Button, Text, View, Alert, AppRegistry } from 'react-native';
import { Permissions, Camera, MediaLibrary, BarCodeScanner } from 'expo'; 

export default class CameraScreen extends React.Component { 
  constructor(props) {
  super(props) ;
  this.state = {
    hasCameraPermission: null, 
    type: Camera.Constants.Type.back
    //Initial state bagkamera
  }
}

static navigationOptions = {
    title: "Ba"
  };

async componentWillMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  await Permissions.askAsync(Permissions.CAMERA_ROLL); 
  this.setState({ hasCameraPermission: status === 'granted' });
  //Permission for MediaLibrary
}

snap = async () => {
  let photo = await this.camera.takePictureAsync(); 
  console.log(photo); 
  await MediaLibrary.createAssetAsync(photo.uri); 
}; 

render() { 
  if (this.state.hasCameraPermission === null) {
    return <View/>;
  } else if (this.state.hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  } else {
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={ this.state.type } ref={ref =>  {this.camera = ref; }}>
        <View
          style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 15}}>
              <Button
                onPress={() => {
                  if(this.state.type === Camera.Constants.Type.back) {
                    this.setState({type: Camera.Constants.Type.front})
                  } else { 
                    this.setState({type: Camera.Constants.Type.back})
                  }
                }}
              title="Flip">
              </Button> 
              <Button onPress={this.snap.bind(this)} title="Take pic">
              </Button>
              <Button title="BarcodeScan" onPress={() => this.props.navigation.navigate('BarcodeScan')}>
              </Button>
        </View>
      </Camera>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:100,
  },
  circle: {
    backgroundColor: "#4CAF50",
    borderWidth: 1,
    color: "white",
    padding: 20,
    textAlign: "center",
    display: "flex",
    fontSize: 16,
    margin: 4,
  }
});

