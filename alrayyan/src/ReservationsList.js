import {View, Text, ScrollView, ToastAndroid, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import {supabase} from './supabase';

export default function ReservationsList({ navigation }) {
  const [data, setData] = React.useState(null);
  const [updated, setUpdated] = React.useState(null);

  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "omr",
  });

  React.useEffect(() => {
    supabase
      .from('reservations')
      .select('*')
      .order('id', {ascending: false})
      .then(response => {
        setData(response.data);
      })
      .catch(() => {
        //
      });
  }, [updated]);

  function handleDeleteReservation(book_id) {
    Alert.alert('Delete Reservation', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          supabase
            .from('reservations')
            .delete()
            .eq('id', book_id)
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

  function handleConfirmReservation(book_id) {
    Alert.alert('Confrim Reservation', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          supabase
            .from('reservations')
            .update({
              status: 'Booked'
            })
            .eq('id', book_id)
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
          There is no reservations avaiable..
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
              <Text style={{fontWeight: 'bold'}}>Refrence No:</Text>{' '}
              {item.reference_no}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Date:</Text> {new Date(item.created_at).toLocaleDateString("en-GB")}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Name:</Text> {item.name}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>mobile:</Text> {item.mobile}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Payment:</Text> {item.payment}
            </Text>
            <Text style={{fontSize: 22, color: '#000'}}>
              <Text style={{fontWeight: 'bold'}}>Total:</Text> {formatter.format(item.total)}
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
              <Text style={{fontWeight: 'bold'}}>Status:</Text> {item.status}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            {item.status == 'In Progress' && <TouchableOpacity style={{ backgroundColor: 'green', padding: 4, margin: 2, borderRadius: 5 }} onPress={() => handleConfirmReservation(item.id, 'Booked')}><Text style={{ color: '#ffffff', fontSize: 12 }}>✓ Confirm</Text></TouchableOpacity>}

            <TouchableOpacity style={{ backgroundColor: 'red', padding: 4, margin: 2, borderRadius: 5 }} onPress={() => handleDeleteReservation(item.id)}><Text style={{ color: '#ffffff', fontSize: 12 }}>x Delete</Text></TouchableOpacity>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}
