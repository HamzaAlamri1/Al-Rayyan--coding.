import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import { supabase } from './supabase';

export default function Welcome({navigation}) {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({data: {session}}) => {        
        if(session){
          setUser(session.user.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ImageBackground
        source={require('./images/fullimg.jpg')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        resizeMode: 'cover'
      }}>
      <Image
        source={require('./images/logo.jpg')}
        style={{
          width: 150,
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center',
          margin: 15,
          borderRadius: 50
        }}
      />
      <Text style={{color: '#f3ede1', padding: 15, fontSize: 22}}>Welcome to Al Rayyan</Text>

      <View>
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
          }}
          onPress={() => navigation.navigate("Home")}
          >
          <Text style={{color: '#f3ede1', textAlign: 'center'}}>
            Book Al Rayyan
          </Text>
        </TouchableOpacity>
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
          }}
          onPress={() => navigation.navigate("Employees")}
          >
          <Text style={{color: '#f3ede1', textAlign: 'center'}}>
            Employees Access
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
