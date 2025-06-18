import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {supabase} from './supabase';

export default function Employees({navigation, route}) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState('');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        if (session) {
          setUser(session.user.id);
          supabase
            .from('employees')
            .select('*')
            .eq('user_id', session.user.id)
            .then(response => {
              console.log(response.data);
              
              if (
                !response.error &&
                response.data &&
                response.data.length != 0
              ) {
                setData(response.data[0]);
              } else {
                setData([]);
              }
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
            });
        } else {
          navigation.navigate('Sign In');
        }
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        (user && data && data.length != 0) && (
          <TouchableOpacity
            style={{
              backgroundColor: '#65a33c',
              padding: 5,
              borderRadius: 5,
              paddingHorizontal: 25,
            }}
            onPress={handleSignOut}
            >
            <Text style={{color: '#f3ede1'}}>Sign out</Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation, user]);

  function handleSignOut() {
    supabase.auth.signOut().then(() => {
      navigation.navigate('Welcome');
    });
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1'}}>
      {data && data.length != 0 && (
        <View
          style={{
            paddingVertical: 25,
            marginVertical: 15,
            paddingLeft: 15,
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            Hello {data.name}, welcome to Al Rayyan dashboard
          </Text>
        </View>
      )}

      {loading && (
        <Text style={{color: '#000', padding: 15, margin: 15}}>
          Loading...
        </Text>
      )}

      {data && data.length == 0 && (<View style={{ flex: 1, }}>
        <Text style={{color: '#000', padding: 15, margin: 5, marginTop: 45, fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Unauthorized Account</Text>
        <Text style={{color: '#000', padding: 15, margin: 15, marginTop: 45, fontSize: 24, textAlign: 'center'}}>You are not allowed to view this page, try siging in with an employee account.</Text>
        <TouchableOpacity
          style={{
            width: 140,
            backgroundColor: '#65a33c',
            padding: 5,
            borderRadius: 5,
            paddingHorizontal: 25,
            alignSelf: 'center'
          }}
          onPress={handleSignOut}
          >
          <Text style={{color: '#f3ede1', textAlign: 'center'}}>Sign out</Text>
        </TouchableOpacity>
      </View>)}

      {data && data.length != 0 && (
        <View>
          <TouchableOpacity
            style={{
              shadowColor: 'black',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              flex: 1,
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#ffffff',
            }}
            onPress={() => navigation.navigate('Reservations List')}>
            <Text style={{fontSize: 22, color: '#000'}}>Reservations List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: 'black',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              flex: 1,
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#ffffff',
              marginVertical: 2,
            }}
            onPress={() => navigation.navigate('Employees List')}>
            <Text style={{fontSize: 22, color: '#000'}}>Employees List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: 'black',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              flex: 1,
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#ffffff',
              marginVertical: 2,
            }}
            onPress={() => navigation.navigate('Users List')}>
            <Text style={{fontSize: 22, color: '#000'}}>Users List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: 'black',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              flex: 1,
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#ffffff',
              marginVertical: 2,
            }}
            onPress={() => navigation.navigate('Feedback Messages')}>
            <Text style={{fontSize: 22, color: '#000'}}>Feedback Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: 'black',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              flex: 1,
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#ffffff',
              marginVertical: 2,
            }}
            onPress={() => navigation.navigate('Gallery Management')}>
            <Text style={{fontSize: 22, color: '#000'}}>
              Gallery Management
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}
