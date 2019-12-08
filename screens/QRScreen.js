import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import { withNavigation } from 'react-navigation';


export default class QRScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
            hasCameraPermission: null,
            barcodeData: "",
            barcodeType: "",
            uid: ""
    };
}


  componentWillUnmount() {
    this.backHandler.remove();
  } 
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate("Links")
      return true;
    });
    }

    render() {
      if (this.state.hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      } else if (this.state.hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
            <View style={{width: '100%' , height:'100%'}}>
              <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned.bind(this)}
                style={StyleSheet.absoluteFill}
              /><Text>Bar code with type {this.state.barcodeType} and data {this.state.barcodeData} has been scanned!</Text>
            </View>
      );
  }

handleBarCodeScanned(type,data){
  this.setState({
        barcodeType : JSON.stringify(type),
        barcodeData : JSON.stringify(data),
  });
  var d = JSON.stringify(data);
  var verify = {
  	//"Scanned Code Type" : type,
  	"Scanned Code Data" : type["data"],
  	"User valid?" : "Yes!",
  	"uid" : type["data"]
  }
  alert(JSON.stringify(verify));
  this.props.navigation.navigate('Seeds', verify)
}; 
}