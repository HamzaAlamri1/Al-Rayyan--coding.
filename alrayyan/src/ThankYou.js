import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ThankYou({navigation, route}) {
  const {reference_no} = route.params;

  return (
      <View style={{flex: 1, alignContent: 'center', alignItems: 'center', backgroundColor: '#f3ede1', padding: 15, justifyContent: 'center'}}>
        <Image
          source={require('./images/logo.jpg')}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
            margin: 15,
            borderRadius: 50,
          }}
        />
        <Text style={{color: '#000', padding: 15, fontSize: 32, fontWeight: 'bold'}}>
          Thank You!
        </Text>
        <Text style={{color: '#000', padding: 15, fontSize: 18, marginTop: 15}}>
          Your reservation is in progress we'll get back to you as soon as
          possible.
        </Text>
        <View
          style={{
            shadowColor: 'black',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            padding: 5,
            backgroundColor: '#ffffff',
            margin: 15,
            alignItems: 'center',
          }}>
          <Text
            style={{color: '#000', padding: 15, fontSize: 18, marginTop: 15, fontWeight: 'bold'}}>
            Reservation Reference No
          </Text>
          <Text
            style={{color: '#000', padding: 15, fontSize: 16, marginTop: 15}}
            selectable={true}>
            {reference_no}
          </Text>
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
            padding: 15,
            backgroundColor: '#65a33c',
            margin: 15,
            paddingHorizontal: 45
          }}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: '#000000', textAlign: 'center'}}>Home</Text>
        </TouchableOpacity>
      </View>
  );
}
