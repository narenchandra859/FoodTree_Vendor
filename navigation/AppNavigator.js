import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler
} from "react-native";
import colors from "../styles/color";
import InputField from "../components/InputField_Test";
import t from 'tcomb-form-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import ItemsScreen from '../screens/ItemsScreen'
import TestScreen from '../screens/TestScreen'
import QRScreen from '../screens/QRScreen'
import SeedScreen from '../screens/SeedScreen'
import SubScreen from '../screens/SubScreen'
import TransactionScreen from '../screens/TransactionScreen'


class LoginScreen extends React.Component {
	constructor(props) {
  	super(props);
  	this.state = {
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
    };
  }
  handleLogin = () => {
  	if(this.state.validEmail ===true) {
  		this.props.navigation.navigate('Home')
  	}
  }
  handleEmailChange =(email) => {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ emailAddress: email });
    if (!this.state.validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false });
    }
  }
  handlePasswordChange = (password) => {
    this.setState({ password });
    if (!this.state.validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true });
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false });
    }
  }
  render() {
    return (
      <ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.wrapper}>
        <ScrollView style={styles.scrollViewWrapper} contentContainerStyle={{justifyContent:'center'}}>  
          <Text>{"\n\n                     "}</Text>
            <Text style={styles.loginHeader}>Welcome to{"\n"}FoodTree Vendor App</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={colors.brown}
              textColor={colors.brown}
              borderBottomColor={colors.brown}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleEmailChange}
              showCheckmark={this.state.validEmail}
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={colors.brown}
              textColor={colors.brown}
              borderBottomColor={colors.brown}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              showCheckmark={this.state.validPassword}
            />
            <View justifyContent='center' alignItems='center'>
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text textAlign='center' style={{color: colors.brown, fontSize:16}}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Register')}>
            <Text textAlign='center' style={{color: colors.brown, fontSize:16}}> Register </Text>
          </TouchableOpacity>
          </View>
          <Text> {"\n\n\n"} </Text>
         </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
	Regcontainer: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'transparent',
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
  wrapper: {  
    display: "flex",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%'
  },
  scrollViewWrapper: {
    flex: 1,
  },
  scrollView: {
    justifyContent: 'center'
  },
  loginHeader: {
    padding: 10,
    fontSize: 25,
    color: colors.brown,
    fontWeight: 'bold',
    marginBottom: 40, 
    textAlign: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
    marginTop: 3,
    marginLeft: -10,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#d9d9d9',
    //backgroundColor: '#e6ff99',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#336633',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center'
   }
 });
const Form = t.form.Form;
  const user = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    aadhar: t.String,
    phoneNumber: t.maybe(t.Number),
    address: t.maybe(t.String),
    terms: t.Boolean
  });
  
	const options = {
	  fields: {
	    email: {
	      error: 'Enter a valid email address'
	    },
	    username: {
	      error: 'Need a username.'
	    },
	    password: {
	      error: 'Use a proper password!'
	    },
	    aadhar: {
	      error: 'Enter 12 digit aadhar number',
	    },
	    terms: {
	      label: 'Agree to Terms',
	      error: 'Must agree!',
	    },
	  },
	};
class RegisterScreen extends React.Component {
  constructor(props) {
  	super(props);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    	this.props.navigation.navigate("AuthLoading")
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }	

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); 
      alert("Successfully registered! Please login");
      this.props.navigation.navigate('AuthLoading');
    }
  }
  render() {
  return (
    <ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.wrapper}>
	      <View style={styles.Regcontainer}>
	        <Form
          	  ref="form"
	          type={user}
	          options={options}
	        />
	        <View styles={{justifyContent: 'center'}}>
		        <TouchableOpacity style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
		          <Text textAlign='center' style={{color: colors.brown}}>Register</Text>
		        </TouchableOpacity>
		    </View>
	      </View>
      </ImageBackground>
	    );
	}
}

class KnowScreen extends React.Component {
	constructor(props) {
  	super(props);
  	}
	render() {
		return (
			<View styles={styles.wrapper}>
			<View styles={{justifyContent: 'center'}}>
				<Text>
					{"\n\n\n\n\n"}About our app. (add some slides)
				</Text>
		        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('AuthLoading')} underlayColor='#99d9f4'>
		          <Text textAlign='center' style={styles.buttonText}>Back To Home</Text>
		        </TouchableOpacity>
		    </View>
			</View>
		);
	}
}

const AppStack = createSwitchNavigator({ Main: MainTabNavigator });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: 	LoginScreen,
      Register: RegisterScreen,
      KnowMore: KnowScreen,
      App: AppStack,
      Item: ItemsScreen,
      Test: TestScreen,
      QRCode: QRScreen,
      Seeds: SeedScreen,
      Subs: SubScreen,
      Transaction: TransactionScreen
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   })
// );
