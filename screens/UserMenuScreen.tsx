import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MenuItem from '../components/MenuItem';
import {RootStackNavigationProp} from './types';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');

  return (
    <View>
      <MenuItem name="로그인" onPress={onLogin} />
      <MenuItem name="회원가입" onPress={onRegister} />
    </View>
  );
}

export default UserMenuScreen;
