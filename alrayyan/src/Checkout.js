import React from 'react';
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from './supabase';

export default function Checkout({navigation, route}) {
  const [data, setData] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [days, setDays] = React.useState(0);
  const [payment, setPayment] = React.useState('Cash');
  const {checkin, checkout} = route.params;

  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "omr",
  });

  React.useEffect(() => {    
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {
        if (session) {
          supabase
            .from('users_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .then(response => {
              if (
                !response.error &&
                response.data &&
                response.data.length != 0
              ) {
                setData(response.data[0]);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if(checkin && checkout){
      let tmpDays = new Date(checkout) - new Date(checkin);
      tmpDays = parseInt(tmpDays / (1000 * 60 * 60 * 24)) + 1;
      tmpTotal = 35 * tmpDays;
      setDays(tmpDays);
      setTotal(tmpTotal);      
    }
  }, [checkin, checkout])

  function handleCheckout() {
    if (!checkin || !checkout) {
      ToastAndroid.show(
        'You have to specify checkin and out dates..',
        ToastAndroid.LONG,
      );
      return false;
    }

    if (payment === '') {
      ToastAndroid.show('Please slect a payment method.', ToastAndroid.LONG);
      return false;
    }

    if(data){
      const reference_no = Date.now().toString()
      supabase
      .from('reservations')
      .insert([
        {
          payment: payment,
          checkin_date: checkin.toDateString(),
          checkout_date: checkout.toDateString(),
          user_id: data.user_id,
          name: data.name,
          mobile: data.mobile,
          status: 'In Progress',
          reference_no: reference_no,
          total: total
        },
      ])
      .then(() => {
        navigation.navigate('Thank You', {reference_no: reference_no});
      })
      .catch(error => {
        ToastAndroid.show('Error, Please try again..', ToastAndroid.LONG);
      });
    } else {
      ToastAndroid.show('Error, Please try again..', ToastAndroid.LONG);
    }
  }

  return (
    <ScrollView style={{backgroundColor: '#f3ede1', padding: 15}}>
      {checkin && checkout && <Text
        style={{
          fontSize: 24,
          padding: 15,
          margin: 15,
          color: 'black',
          fontWeight: 'bold',
        }}>
        Booking Al Rayyan for {days} Days from {checkin.toLocaleDateString("en-GB")} to {checkout.toLocaleDateString("en-GB")}
      </Text>}
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
        <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>
          Booking Detials
        </Text>
        <Text style={{fontSize: 22, color: '#000'}}>Name: Hamza Al Amri</Text>
        <Text style={{fontSize: 22, color: '#000'}}>Mobile: 97258244</Text>
        <Text style={{fontSize: 22, color: '#000'}}>Price: {formatter.format(total)}</Text>
      </View>
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
          padding: 15,
          backgroundColor: '#ffffff',
          margin: 15,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#000',
            fontWeight: 'bold',
            padding: 15,
          }}>
          Payment Method:
        </Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
          <TouchableOpacity
            style={{
              backgroundColor: payment == 'Cash' ? '#65a33c' : '#f3ede1',
              padding: 5,
              borderRadius: 5,
              paddingHorizontal: 25,
              margin: 10,
            }}
            onPress={() => setPayment('Cash')}>
            <Text style={{color: payment == 'Cash' ? '#f3ede1' : '#65a33c'}}>
              Cash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: payment == 'Debit Card' ? '#65a33c' : '#f3ede1',
              padding: 5,
              borderRadius: 5,
              paddingHorizontal: 25,
              margin: 10,
            }}
            onPress={() => setPayment('Debit Card')}>
            <Text
              style={{color: payment == 'Debit Card' ? '#f3ede1' : '#65a33c'}}>
              Debit Card
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
        onPress={handleCheckout}>
        <Text style={{color: '#000000', textAlign: 'center'}}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
