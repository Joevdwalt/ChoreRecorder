import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Main from './Main/Main';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import ChoreReducer from './Reducers/ChoreRecorderReducer';

// MyTasks
//import MyTasksReducer from './MyTasks/MyTasksReducer';
const store = createStore(ChoreReducer, applyMiddleware(thunk));

 export default class App extends React.Component {
  state = {
    loggedin: false
  };

  render() {

   

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={ store }>
          <Main />
        </Provider>
      );
    }
  }
 
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'), 
        Montserrat: require('./assets/fonts/Montserrat-Regular.otf'),
        MontserratExtraBold: require('./assets/fonts/Montserrat-ExtraBold.otf'),
        Unititled: require('./assets/fonts/untitled-font-1.ttf'),
        icomoon : require('./assets/fonts/icomoon.ttf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
