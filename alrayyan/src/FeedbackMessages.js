import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {supabase} from './supabase';

export default function FeedbackMessages({navigation}) {
  const [data, setData] = React.useState(null);
  const [updated, setUpdated] = React.useState(null);

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
          onPress={() => navigation.navigate('New Emplyee')}>
          <Text style={{color: '#f3ede1'}}>New</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    supabase
      .from('users_feedback')
      .select('*')
      .then(response => {
        setData(response.data);
      })
      .catch(() => {
        //
      });
  }, [updated]);

  function handleDeleteReservation(feedback_id) {
    Alert.alert('Delete Reservation', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          supabase
            .from('users_feedback')
            .delete()
            .eq('id', feedback_id)
            .then(() => {
              setUpdated(Date.now());
            })
            .catch(error => {
              ToastAndroid.show(
                'Error while deleting image.',
                ToastAndroid.LONG,
              );
            });
        },
      },
    ]);
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1'}}>
      {data && data.length == 0 && (
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            color: '#000',
            margin: 15,
            padding: 15,
          }}>
          There is no employees avaiable..
        </Text>
      )}

      {data &&
        data.map(item => (
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
              <Text style={{fontWeight: 'bold'}}>Date:</Text>{' '}
              {(new Date(item.created_at).toLocaleDateString("en-GB"))}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Name:</Text> {item.name}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>mobile:</Text> {item.mobile}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>email:</Text> {item.email}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>{item.message}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 2,
                margin: 3,
                width: 70,
                borderRadius: 5,
              }}
              onPress={() => handleDeleteReservation(item.id)}>
              <Text
                style={{color: '#ffffff', fontSize: 12, textAlign: 'center'}}>
                x Delete
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
}
