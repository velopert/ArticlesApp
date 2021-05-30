import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import MainTab from './MainTab';

const Stack = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
}

export default RootStack;
