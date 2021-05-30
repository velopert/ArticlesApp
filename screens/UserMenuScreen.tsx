import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MenuItem from '../components/MenuItem';
import {RootStackNavigationProp} from './types';
import {useUserState} from '../contexts/UserContext';
import {clearToken} from '../api/client';
import authStorage from '../storages/authStorage';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [user, setUser] = useUserState();

  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');
  const onLogout = () => {
    setUser(null);
    clearToken();
    authStorage.clear();
  };

  return (
    <View>
      {user ? (
        <MenuItem name="로그아웃" onPress={onLogout} />
      ) : (
        <>
          <MenuItem name="로그인" onPress={onLogin} />
          <MenuItem name="회원가입" onPress={onRegister} />
        </>
      )}
    </View>
  );
}

export default UserMenuScreen;
