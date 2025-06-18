import React from 'react';
import { ToastAndroid } from 'react-native';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import { supabase } from './supabase';

export default function Register({navigation, route}) {
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  function handleRegister() {    
    if (email != '' || password != '' || name != '') {
      if (password != repeatPassword) {
        ToastAndroid.show('Passwords does not match.', ToastAndroid.LONG);
      } else if (password.length < 6) {
        ToastAndroid.show('Password should be a least 6 characters length...', ToastAndroid.LONG);
      } else if (mobile.length < 8) {
        ToastAndroid.show('Mobile number is not valid.', ToastAndroid.LONG);
      } else if (!(email.includes('@')) || !(email.includes('.'))) {
        ToastAndroid.show('Email is invalid.', ToastAndroid.LONG);
      } else {
        supabase.auth
          .signUp({
            email: email,
            password: password,
          })
          .then(response => {
            if (response.error) {
              ToastAndroid.show(response.error.message, ToastAndroid.LONG);
            }
            if (
              response.data.user.identities &&
              response.data.user.identities.length > 0
            ) {
              supabase
                .from('users_profiles')
                .insert([
                  {
                    name: name,
                    mobile: mobile,
                    email: email,
                    user_id: response.data.user.id,
                  },
                ])
                .then(({data, error}) => {
                  if (error) {
                    ToastAndroid.show('Error while creating your account.', ToastAndroid.LONG);
                  } else {
                    navigation.navigate('Sign In');
                  }
                })
                .catch(err => {
                  ToastAndroid.show('Error while creating your account.', ToastAndroid.LONG);
                });
            } else {
              ToastAndroid.show('Email address is already taken.', ToastAndroid.LONG);
            }
          })
          .catch(err => {
            ToastAndroid.show('Error while creating your account.', ToastAndroid.LONG);
          });
      }
    } else {
      ToastAndroid.show('Fillin all the required fields...', ToastAndroid.LONG);
    }
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1', padding: 15}}>
      <Text style={{color: '#000', padding: 15}}>Full Name:</Text>
      <TextInput
        style={{
          shadowColor: 'black',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
          flex: 1,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          margin: 5,
          padding: 15,
        }}
        onChangeText={setName}
        value={name}
        placeholder="Full Name"
      />
      <Text style={{color: '#000', padding: 15}}>Mobile Number:</Text>
      <TextInput
        style={{
          shadowColor: 'black',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
          flex: 1,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          margin: 5,
          padding: 15,
        }}
        onChangeText={setMobile}
        value={mobile}
        placeholder="Mobile Number"
      />
      <Text style={{color: '#000', padding: 15}}>E-mail address:</Text>
      <TextInput
        style={{
          shadowColor: 'black',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
          flex: 1,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          margin: 5,
          padding: 15,
        }}
        onChangeText={setEmail}
        value={email}
        placeholder="E-mail Address"
      />

      <Text style={{color: '#000', padding: 15}}>Password:</Text>
      <TextInput
        style={{
          shadowColor: 'black',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
          flex: 1,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          margin: 5,
          padding: 15,
        }}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Text style={{color: '#000', padding: 15}}>Repeat Password:</Text>
      <TextInput
        style={{
          shadowColor: 'black',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
          flex: 1,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          margin: 5,
          padding: 15,
        }}
        onChangeText={setRepeatPassword}
        value={repeatPassword}
        placeholder="Repeat Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          shadowColor: 'black',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          flex: 1,
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: '#65a33c',
          margin: 15,
        }}
        onPress={handleRegister}
        >
        <Text style={{color: '#000000', textAlign: 'center'}}>
          Create a new account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
