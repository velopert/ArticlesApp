import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';

export interface AuthFormProps {
  isRegister?: boolean;
}

function AuthForm({isRegister}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const {mutate: login, isLoading: loginLoading} = useLogin();
  const {mutate: register, isLoading: registerLoading} = useRegister();

  const isLoading = loginLoading || registerLoading;

  const onPress = () => {
    if (isLoading) {
      return;
    }

    if (isRegister) {
      register({
        email,
        username,
        password,
      });
    } else {
      login({
        identifier,
        password,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
      <View style={styles.block}>
        <View>
          {isRegister ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="계정명"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="이메일 또는 계정명"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={({pressed}) => [
              styles.submit,
              Platform.OS === 'ios' && pressed && styles.submitPressed,
            ]}
            android_ripple={{color: '#42a5f5'}}
            onPress={onPress}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.submitText}>
                {isRegister ? '회원가입' : '로그인'}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#dddddd',
    borderWidth: 1,
    marginBottom: 8,
  },
  submit: {
    marginTop: 24,
    backgroundColor: '#2196f3',
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitPressed: {
    opacity: 0.75,
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AuthForm;
