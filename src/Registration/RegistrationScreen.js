import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native'

import { TextInput } from 'react-native-gesture-handler';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';


class RegistrationScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };
  
    state = {
      username: "",
      password: ""
    }
        
    render () {
  
      return <View style={styles.container}>
  
              <Text style={TITLE.text}>
                Create and Account 
              </Text>
              
              <TextInput style={TEXTINPUT.input} placeholder="Username" 
                        autoCapitalize="none"
                        onChangeText={text => this.setState({username: text})} 
                        value={this.state.username}/>
  
              <TextInput 
                  style={TEXTINPUT.input} 
                  placeholder="Password" 
                  secureTextEntry 
                  autoCapitalize="none" 
                  onChangeText={text => this.setState({password: text})} 
                  value={this.state.password}
                  />

             <TextInput 
                  style={TEXTINPUT.input} 
                  placeholder="Confirm password" 
                  secureTextEntry 
                  autoCapitalize="none" 
                  onChangeText={text => this.setState({password: text})} 
                  value={this.state.password}
                  />
                
              <View>
                <TouchableOpacity style={BUTTON.button} disabled={this.props._loggingIn}  onPress={() => {this.props.login(this.state)}}>
                    <Text style={WHITETEXT.text}> Create Account </Text>
                </TouchableOpacity>
              </View>
              
            
            </View>
  
    }
  }
  
   
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
       
    }, dispatch)
  );
  
  const mapStateToProps = (state) => {
    const { choreRecorderState } = state
    return { choreRecorderState }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
  
const TEXT = StyleSheet.create({
  text : {
     fontSize: 14,
     color:'#00BCD4',
     
  }
});

const ERRORTEXT=StyleSheet.create({
text : {
   ...TEXT.text,
   color:'#00BCD4',
   marginTop:7,
   textAlign:'center',
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
    textAlign:'center',
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