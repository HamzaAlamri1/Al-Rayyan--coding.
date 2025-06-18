import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {supabase} from './supabase';
import {ToastAndroid} from 'react-native';

export default function Signin({navigation, route}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSignin() {
    if (email != '' || password != '') {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } else {
        supabase
          .from('users_profiles')
          .select('*')
          .eq('user_id', data.session.user.id)
          .then(response => {            
            if(!response.error && response.data && response.data.length != 0) {              
              navigation.navigate('Welcome');
            } else {
              supabase.auth.signOut().then(() => {
                navigation.navigate('Sign In');
              });
            }
          })
          .catch((err) => {            
            ToastAndroid.show(
              'Sorry, Something went wrong...',
              ToastAndroid.LONG,
            );
          });
      }
    } else {
      ToastAndroid.show(
        'Enter your email and password first',
        ToastAndroid.LONG,
      );
    }
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1', padding: 15}}>
      <Image
        source={require('./images/logo.jpg')}
        style={{
          width: 250,
          height: 250,
          resizeMode: 'contain',
          alignSelf: 'center',
          margin: 15,
        }}
      />
      <Text style={{color: '#000', padding: 15}}>E-mail Address:</Text>
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
        onPress={handleSignin}>
        <Text style={{color: '#000000', textAlign: 'center'}}>Sigin In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            margin: 15,
            padding: 15,
            fontSize: 18,
          }}
          onPress={() => navigation.navigate('Register')}>
          Don't have an account?{' '}
          <Text
            style={{
              color: '#65a33c',
              fontStyle: 'italic',
              borderBottomColor: '#65a33c',
              borderBottomWidth: 1,
            }}>
            Register
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
