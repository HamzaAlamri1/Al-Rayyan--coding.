import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function Myprofile({navigation, route}) {
  const [data, setData] = React.useState(null);
  const [myReservations, setMyReservations] = React.useState(null);
  const {user} = route.params;

  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "omr",
  });

  React.useEffect(() => {
    if (user) {
      supabase
        .from('users_profiles')
        .select('*')
        .eq('user_id', user)
        .then(response => {
          if (!response.error && response.data && response.data.length != 0) {
            setData(response.data[0]);
          }
          loadMybookingsReservation();
        })
        .catch(() => {
          loadMybookingsReservation();
        });
    }
  }, [user]);

  function loadMybookingsReservation() {
    supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user)
      .then(response => {
        setMyReservations(response.data);
      })
      .catch(() => {
        //
      });
  }
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#65a33c',
            padding: 5,
            borderRadius: 5,
            paddingHorizontal: 25,
          }}
          onPress={handleSignOut}>
          <Text style={{color: '#f3ede1'}}>Sign out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function handleSignOut() {
    supabase.auth.signOut().then(() => {
      navigation.navigate('Welcome');
    });
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1'}}>
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
          <Text style={{fontSize: 22, color: '#000'}}>Name: {data.name}</Text>
          <Text style={{fontSize: 22, color: '#000'}}>
            Mobile: {data.mobile}
          </Text>
          <Text style={{fontSize: 22, color: '#000'}}>
            E-mail: {data.email}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#65a33c',
              padding: 5,
              borderRadius: 5,
              paddingHorizontal: 25,
              marginTop: 20,
              width: '45%',
            }}
            onPress={() =>
              navigation.navigate('Edit Profile', {user_data: data})
            }>
            <Text style={{color: '#f3ede1'}}>Edit your profile</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text
        style={{
          fontSize: 20,
          padding: 15,
          margin: 15,
          color: 'black',
          fontWeight: 'bold',
        }}>
        My Reservations:
      </Text>

      {myReservations && myReservations.length == 0 && (
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            color: '#000',
            margin: 15,
            padding: 15,
          }}>
          You did not made any reservations yet..
        </Text>
      )}

      {myReservations &&
        myReservations.map(item => (
          <View
            key={'bookno-' + item.id}
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
              <Text style={{fontWeight: 'bold'}} selectable={true}>Refrence No:</Text>{' '}
              {item.reference_no}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Date:</Text> {new Date(item.created_at).toLocaleDateString("en-GB")}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>From:</Text>{' '}
              {new Date(item.checkin_date).toLocaleDateString('en-GB')}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>To:</Text>{' '}
              {new Date(item.checkout_date).toLocaleDateString('en-GB')}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Total:</Text> {formatter.format(item.total)}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Status:</Text> {item.status}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
}
