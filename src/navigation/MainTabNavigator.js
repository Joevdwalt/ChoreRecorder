import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import SettingsScreen from '../screens/SettingsScreen';
import MyTasksScreen from '../MyTasks/MyTasksScreen';
import TaskTemplatesScreen from '../TaskTemplates/TaskTemplatesScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const MyTasksStack = createStackNavigator({
  MyTasks: MyTasksScreen,
});

MyTasksStack.navigationOptions = {
  tabBarLabel: 'My Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-checkbox${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const TaskTemplatesStack = createStackNavigator({
  TaskTemplates: TaskTemplatesScreen,
});
TaskTemplatesStack.navigationOptions = {
  tabBarLabel: 'Task Templates',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-clipboard`
          : 'md-clipboard'
      }
    />
  ),
};


const MyPointsStack = createStackNavigator({
  MyTasks: MyTasksScreen,
});
MyPointsStack.navigationOptions = {
  tabBarLabel: 'Points',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ?  `ios-pie`
          : 'md-pie'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  MyTasksStack,
  TaskTemplatesStack,
  MyPointsStack,
  SettingsStack,
});
