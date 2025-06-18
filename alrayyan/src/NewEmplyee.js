import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function NewEmplyee({navigation, route}) {
  const [data, setData] = React.useState(null);
  const [email, setEmail] = React.useState('');

  function handleUpgradeAccount() {
    if (data) {
      supabase
        .from('employees')
        .insert([
          {
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            user_id: data.user_id,
          },
        ])
        .then(({data, error}) => {
          if (error) {
            ToastAndroid.show(
              'Error while upgrading account.',
              ToastAndroid.LONG,
            );
          } else {
            navigation.navigate("Employees List")
          }
        });
    } else {
      ToastAndroid.show('Search for user by email first.', ToastAndroid.LONG);
    }
  }

  function handleSearchByEmail() {
    setData(null);
    supabase
      .from('users_profiles')
      .select('*')
      .eq('email', email)
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          setData(response.data[0]);
        } else {
          ToastAndroid.show('No registered users found linked to this email.', ToastAndroid.LONG);
        }
      })
      .catch(() => {
        //
      });
  }
  return (
    <ScrollView style={{backgroundColor: '#f3ede1', padding: 15}}>
      <Text style={{color: '#000', padding: 15}}>E-mail address:</Text>
      <View style={{ flexDirection: 'row' }}>
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
      <TouchableOpacity style={{ backgroundColor: '#65a33c', margin: 5, borderRadius: 15, padding: 5, alignItems: 'center', justifyContent: 'center' }} onPress={handleSearchByEmail}>
        <Text style={{ padding: 5, }}>Search</Text>
      </TouchableOpacity>
      </View>

      {data && (
        <View
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
            padding: 25,
            backgroundColor: '#ffffff',
            margin: 15,
          }}>
          <Text style={{fontSize: 22, color: '#000'}}>
            <Text style={{fontWeight: 'bold'}}>Join Date:</Text>{' '}
            {new Date(data.created_at).toLocaleDateString("en-GB")}
          </Text>
          <Text style={{fontSize: 22, color: '#000'}}>
            <Text style={{fontWeight: 'bold'}}>Name:</Text> {data.name}
          </Text>
          <Text style={{fontSize: 22, color: '#000'}}>
            <Text style={{fontWeight: 'bold'}}>mobile:</Text> {data.mobile}
          </Text>
          <Text style={{fontSize: 22, color: '#000'}}>
            <Text style={{fontWeight: 'bold'}}>email:</Text> {data.email}
          </Text>
        </View>
      )}

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
        onPress={handleUpgradeAccount}
        >
        <Text style={{color: '#000000', textAlign: 'center'}}>
          Upgrade to user to emplyee
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
