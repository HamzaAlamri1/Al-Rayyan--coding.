import React from 'react';
import {ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity} from 'react-native';
import { supabase } from './supabase';

export default function EditProfile({navigation, route}) {
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {user_data} = route.params;

  React.useEffect(() => {
    if(user_data){
      setName(user_data.name);
      setMobile(user_data.mobile)
    }
  }, [user_data]);

  function handleUpdateUserProfile() {
    if (mobile != ''|| name != '') {
      supabase
        .from('users_profiles')
        .update(
          {
            name: name,
            mobile: mobile,
          },
        )
        .eq('id', user_data.id)
        .then(() => {
          if(password != ""){
            supabase
            .auth
            .updateUser({
              password: password
            })
            .then(() => {
              supabase
              .auth
              .signOut()
              .then(() => {
                navigation.navigate('Welcome');
              });
            })
            .catch((err) => {
              ToastAndroid.show('Error while creating your account.', ToastAndroid.LONG);
            });
          } else {
            navigation.navigate("My Profile", {user: user_data.user_id});
          }
        })
        .catch(err => {
          console.log(err);
        })

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
        placeholder="Leave empty if you don't want to change password"
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
        onPress={handleUpdateUserProfile}>
        <Text style={{color: '#000000', textAlign: 'center'}}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
