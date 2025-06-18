import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {supabase} from './supabase';

export default function Feedback({navigation, route}) {
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  function handleSndingFeedback() {
    if (email != '' || message != '' || name != '' || mobile != '') {
      if (mobile.length < 8) {
        ToastAndroid.show('Mobile number is not valid.', ToastAndroid.LONG);
      } else if (!email.includes('@') || !email.includes('.')) {
        ToastAndroid.show('Email is invalid.', ToastAndroid.LONG);
      } else {
        supabase
          .from('users_feedback')
          .insert([
            {
              name: name,
              mobile: mobile,
              email: email,
              message: message,
            },
          ])
          //.execute()
          .then(({data, error}) => {
            navigation.navigate('Welcome');
          })
          .catch(() => {
            ToastAndroid.show(
              'Error while sending your feedback.',
              ToastAndroid.LONG,
            );
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

      <Text style={{color: '#000', padding: 15}}>Message:</Text>
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
          height: 200,
        }}
        onChangeText={setMessage}
        value={message}
        textAlignVertical="top"
        multiline={true}
        placeholder="Your feedback message"
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
        onPress={handleSndingFeedback}>
        <Text style={{color: '#000000', textAlign: 'center'}}>Send</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
