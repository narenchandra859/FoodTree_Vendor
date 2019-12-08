import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {Linking} from 'react-native'

const ngo = [
	{
		name: 'Robin Hood Army',
		avatar: require("../assets/images/robinhood.png"),
		contact: '+91 9820169868',
		mail: 'info@robinhoodarmy.com'
	},
	{
		name: 'Need Base India',
		avatar: require("../assets/images/needbase.png"),
		contact: '+91 9152380029',
		mail: 'contact@needbaseindia.org'
	},
	{
		name: 'Aawahan Foundation',
		avatar: require("../assets/images/aawa.png"),
		contact: '+91 9113018004',
		mail: 'info@aahwahan.com'
	}
]

export default function SettingsScreen() {
  return(
  <ImageBackground source={require('../assets/images/background_t.jpg')} style={styles.container}>
  <View style={styles.wrapper}>
  <Card containerStyle={{padding: 0}} style={styles.cards}>
  {
    ngo.map((u, i) => {
      return (<View key={i}>
        <ListItem
          key={i}
          roundAvatar
          title={u.name}
		  leftAvatar={{source: u.avatar}}
		  backgroundColor='rgba(52, 52, 52, 0.8) 	'
        />
        <Button
						    icon={<Icon name='phone' color='#ffffff' />}
						    buttonStyle={{borderRadius: 1, marginLeft: 5, marginRight: 5, marginBottom: 5, }}
						    title='Call now'
						    onPress={() => Linking.openURL(`tel:${u.contact}`)} />
	    <Button
						    icon={<Icon name='mail' color='#ffffff' />}
						    buttonStyle={{borderRadius: 1, marginLeft: 5, marginRight: 5, marginBottom: 5, }}
						    title='Mail now'
						    onPress={() => Linking.openURL(`mailto:${u.mail}?subject=DonateFood&body=Donating`)} />
		<Text>{"\n"}</Text>
		<View
			  style={{
			    borderBottomColor: 'black',
			    borderBottomWidth: 1,
			  }}
		/>
		</View>
      );
    })
  	}
  </Card>
  </View>
  </ImageBackground>
  	);
}

const styles= StyleSheet.create({
	wrapper: {
		flex:1,
		paddingTop: 40
	},
	container: {
    flex: 1,
    width: '100%',
	height: '100%',
  },
	cards: {
		marginLeft: 5,
		marginRight:5,
		height: 100,
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	}
});

SettingsScreen.navigationOptions = {
  header:null
};
