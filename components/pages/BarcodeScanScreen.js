import React from 'react';
import { StyleSheet, Button, Text, View, Alert, AppRegistry } from 'react-native';
import { Permissions, Camera, MediaLibrary, BarCodeScanner } from 'expo'; 
import ListScreen from './ListScreen';


export default class BarcodeScanScreen extends React.Component { 
    constructor(props) {
        super(props) ;
        this.state = {
          hasCameraPermission: null, 
          type: Camera.Constants.Type.back
          //Initial state bagkamera
        }
      }

      static navigationOptions = {
        title: "BarcodeScan"
      };
      
      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL); 
        this.setState({ hasCameraPermission: status === 'granted' });
        //Permission for MediaLibrary
      }

      render() { 
        if (this.state.hasCameraPermission === null) {
              return <View />;
            } else if (this.state.hasCameraPermission === false) {
              return <Text>No access to camera</Text>; 
            } else {
                return (
                    <View style={{flex: 1}}>
                        <BarCodeScanner style={{flex: 1}}
                            onBarCodeRead={this._handlBarCodeRead}
                            style={StyleSheet.absoluteFill}
                        />
                    </View>
                );
            }
        }
           
        _handlBarCodeRead = ({ type, data }) => {
            alert(`Barcode with the type: ${type} and data: ${data} has been scanned`);
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
      }
});
  