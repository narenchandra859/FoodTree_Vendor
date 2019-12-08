import React, { Component, useState, useEffect } from 'react'
import { ScrollView, 
  StyleSheet, 
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import t from 'tcomb-form-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import CameraComponent from "../components/CameraComponent";



const Form = t.form.Form;
  const item = t.struct({
    name: t.String,
    mrp: t.Number,
    discount: t.Number,
    time_hr: t.Number,
    time_min: t.maybe(t.Number),
  });

export default function ItemsScreen() {
    const { navigate } = useNavigation();

  const [filePath,setFilePath] = useState({
    filePath: {
      data: '',
      uri: ''
    }
  });
  const handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); 
      alert("Item added!");
      navigate("Links");
    }
  }

  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    console.log("WOWOWOWOWOW");
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        setFilePath({
          filePath: source,
        });
      }
    });
  };

  return (
 <ImageBackground source={require('../assets/images/background2.jpg')} style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        <View style={styles.Regcontainer}>
          <Form
            ref={(form) => { this.form = form; }}
            type={item}
            options={{}}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
              <Text textAlign='center' style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        <Image
            source={{
              uri: 'data:image/jpeg;base64,' + filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: filePath.uri }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {filePath.uri}
          </Text>
        {//<Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => { this.camera = ref }} />
        // <TouchableOpacity style={styles.captureButton} onPress={this.takePicture} />
      }
        <TouchableOpacity onPress={this._pickImage} underlayColor="#841584" style={styles.button}>
           <Text textAlign='center' style={styles.buttonText}>Image</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <CameraComponent />
  </ImageBackground>
    )
}

ItemsScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  buttonContainer: {

  },
  button: {

  },
  Regcontainer: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  RegbuttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center'
  },
  Regbutton: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});
