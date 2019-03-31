import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    StatusBar

  } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginScreen from '../Login/LoginScreen/';
import AppNavigator from '../navigation/AppNavigator';


class Main extends React.Component {

    render() {
        return ( 
                _renderLogin(this.props)
            )
        }
}

_renderLogin = (props) => {
   
        return  <View style={styles.container}>
                 {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                 <AppNavigator />
                </View>
   

}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
       
    }, dispatch)
  );
  
  const mapStateToProps = (state) => {
    const { choreRecorderState } = state
    return { choreRecorderState }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Main); 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });