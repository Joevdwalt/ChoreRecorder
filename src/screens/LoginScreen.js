import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { TextInput } from 'react-native-gesture-handler';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onPress = () => {
    console.log("sdf");
  }

  render () {

    return <View style={styles.container}>
            <Text style={TITLE.text}>
              Login 
            </Text>
            
            <TextInput style={TEXTINPUT.input} placeholder="Username" />

            
            <TextInput 
                style={TEXTINPUT.input} 
                placeholder="Password" 
                secureTextEntry 
                autoCapitalize="none" />
              
            <View>
              <TouchableOpacity style={BUTTON.button} onPress={this.onPress}>
                <Text style={WHITETEXT.text}> Login </Text>
              </TouchableOpacity>
            </View>
            
          </View>

  }
}

const TEXT = StyleSheet.create({
    text : {
       fontSize: 14,
       color:'#00BCD4'
    }
});

const WHITETEXT  = StyleSheet.create({
    
  text: {
    ...TEXT.text,
    color:'#fff',
    textAlign:'center',
    fontSize: 16,
      
  }

});
const TITLE = StyleSheet.create({
    text:{
    ...TEXT.text,
    fontSize: 36,
    fontWeight: "bold",
    marginBottom:20,
    textAlign: "center",
    marginTop: 20
    
  }

});

const TEXTINPUT = StyleSheet.create({
  input: {
    ...TEXT.text,
    marginTop:10,
    paddingBottom:10,
    marginLeft:30,
    marginRight:30,
    marginBottom:20,
    backgroundColor:'#fff',
   
    borderBottomWidth: 1,
    //borderWidth: 1,
    borderColor: '#00BCD4'
    
  }
});

const BUTTON = StyleSheet.create({
  button: {
    ...TEXT.text,
    textAlign:'center',
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
    
  }
});

const styles = StyleSheet.create({
  container: {
    padding :10,
    margin: 15
  }
});