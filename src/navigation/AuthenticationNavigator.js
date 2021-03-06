import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen  from '../Login/LoginScreen';
import RegistrationScreen from '../Registration/RegistrationScreen';

const LoginStack = createStackNavigator({
    Login: LoginScreen,
  });

LoginStack.navigationOptions = {
    
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      />
    ),
  };

const RegistrationStack = createStackNavigator({
    Register: { 
        screen: RegistrationScreen
    }
})

RegistrationStack.navigationOptions= 
{
   
};

export default createStackNavigator({
    Login: LoginStack,
    Register: RegistrationStack
   
    
},
{
    initialRouteName:"Login"
});
