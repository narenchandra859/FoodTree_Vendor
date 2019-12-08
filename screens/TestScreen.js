import * as React from 'react';
import {useContext} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text } from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import { Alert, Keyboard, Image, View, StyleSheet, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import {Global} from '../App';


const initialValues = {
  itemName: '',
  itemPrice: '',
  itemDiscount: '',
  itemDuration:'',
  image: ''
}

export default class TestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.mine=this.mine.bind(this);
  };
  mine(){
    this.props.navigation.navigate("Links");
  }
    componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate("Links")
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  } 

  render() {
    return (
      <View style={[styles.container, styles.content]}>
        <Haha  mine={this.mine}/>
      </View>
    );
  }
}

function Haha(props){
  const {addItem}=useContext(Global);
  return(
    <Meme addItem={addItem} mine={props.mine} />
    )
}

class Meme extends React.Component{
constructor(props){
super(props);
}
onSubmit(values) {
    //List of form values
    console.log(values);
    Alert.alert(JSON.stringify(values));
    alert("Item successfully added!");
    Keyboard.dismiss();
    this.props.mine()
    this.props.addItem(values)
  }

  async _pickImage (handleChange) {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })
    console.log(result)
    if (!result.cancelled) {
      handleChange(result.uri)
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.content]}>
        <Formik 
          initialValues={initialValues} 
          onSubmit={this.onSubmit.bind(this)}>
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('itemName')}
                value={values.itemName}
                label="Item Name"
                placeholder="e.g Milk"
              />
              <TextInput
                onChangeText={handleChange('itemPrice')}
                value={values.itemPrice}
                label="Item MRP"
                placeholder="e.g 25"
              />
              <TextInput
                onChangeText={handleChange('itemDiscount')}
                value={values.itemDiscount}
                label="Item Discount"
                placeholder="e.g 5"
              />
              <TextInput
                onChangeText={handleChange('itemDuration')}
                value={values.itemDuration}
                label="Item Duration"
                placeholder="e.g Date -- MM/DD or Time -- 21:00"
              />
              <Button
                icon="camera" mode="contained" style={styles.button}
                onPress={() => {this._pickImage(handleChange('image'))}}
              ><Text style={{color: 'brown'}}>Pick an image from camera roll</Text></Button>
              {values.image && values.image.length > 0 ?
                <Image source={{ uri: values.image }} style={{ width: 200, height: 200 }} /> : null}
              <Button onPress={handleSubmit} style={styles.button}><Text style={{color: 'brown'}}>Submit</Text></Button>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    paddingTop: 40,
    padding: 16,
  },
  button: {
  marginTop: 16,
   backgroundColor: '#DDDDDD',
   borderColor: '#336633',
  }
});