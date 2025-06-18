import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {CarouselMomentum} from 'react-native-momentum-carousel';
import {supabase} from './supabase';

export default function HomeScreen({navigation, route}) {
  const [data, setData] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [checkinDate, setCheckinDate] = React.useState(null);
  const [checkinModal, setCheckinModal] = React.useState(false);
  const [checkoutDate, setCheckoutDate] = React.useState(null);
  const [checkoutModal, setCheckoutModal] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase
      .auth
      .getSession()
      .then(({data: {session}}) => {
        if(session){
          setUser(session.user.id);
        } else {
          setUser(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },[]);
  
  React.useEffect(() => {
    supabase
      .from('gallery')
      .select('*')
      .then(response => {
        if (!response.error && response.data && response.data.length != 0) {
          setData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onSnap = index => {
    setCurrentIndex(index);
  };

  function handleCheckAvailibilty() {
    if (checkinDate == null || checkoutDate == null) {
      ToastAndroid.show(
        'You have to specify checkin and out dates..',
        ToastAndroid.LONG,
      );
      return false;
    }

    if(checkoutDate < checkinDate){
      ToastAndroid.show(
        'Enter avalid checkout date..',
        ToastAndroid.LONG,
      );
      return false;
    }

    if(!user){
      navigation.navigate("Sign In");
      return false;
    }

    const checkinDateString = checkinDate.toLocaleDateString("en-CA");
    const checkoutDateString = checkoutDate.toLocaleDateString("en-CA");


    supabase
      .from('reservations')
      .select('*')
      .not('checkout_date', 'lt', checkinDateString)
      .not('checkin_date', 'gt', checkoutDateString)
      .then(response => {
        if (response.error || (response.data && response.data.length == 0)) {
          navigation.navigate('Checkout', {
            checkin: checkinDate,
            checkout: checkoutDate,
          });
        } else {
          ToastAndroid.show(
            'Booked, Please select another date..',
            ToastAndroid.LONG,
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: '#f3ede1'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 15,
            marginTop: 15,
          }}>
          <Image
            source={require('./images/logosm.jpg')}
            style={{width: 50, height: 50, resizeMode: 'contain'}}
          />
          {user != null && <View style={{padding: 15}}>
            <TouchableOpacity
              style={{borderColor: '#65a33c', borderWidth: 1, padding: 4}}
              onPress={() =>
                user
                  ? navigation.navigate('My Profile', {user: user})
                  : navigation.navigate('Sign In')
              }>
              <Text style={{color: '#65a33c'}}>
                {user ? 'My Profile' : 'Sing In / Register'}
              </Text>
            </TouchableOpacity>
          </View>}
        </View>

        <ImageBackground
          source={require('./images/poolbg.jpg')}
          style={{resizeMode: 'cover', height: 470}}>
          <Text
            style={{
              marginVertical: 100,
              color: '#ffffff',
              textAlign: 'center',
              position: 'relative',
              fontSize: 36,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 13},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 15,
              fontWeight: 'bold',
            }}>
            Unplug, unwind, and experience true relaxation
          </Text>
          <View
            style={{
              margin: 15,
              padding: 15,
              borderRadius: 15,
              backgroundColor: '#ffffff',
              position: 'absolute',
              zIndex: 2,
              bottom: -55,
              width: '80%',
              alignSelf: 'center',
            }}>
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
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                margin: 5,
                padding: 15,
              }}
              onPress={() => setCheckinModal(true)}>
              <Image
                source={require('./images/calendericon.png')}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contin',
                  margin: 5,
                  padding: 15,
                }}
              />
              <View>
                <Text style={{color: '#111'}}>Check In</Text>
                <Text style={{color: '#636363'}}>
                  {!checkinDate
                    ? 'Select Date'
                    : checkinDate.toLocaleDateString('en-GB')}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                shadowColor: '#000',
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                flex: 1,
                backgroundColor: '#ffffff',
                flexDirection: 'row',
                margin: 5,
                padding: 15,
              }}
              onPress={() => setCheckoutModal(true)}>
              <Image
                source={require('./images/usersicon.png')}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contin',
                  margin: 5,
                  padding: 15,
                }}
              />
              <View>
                <Text style={{color: '#111'}}>Check Out</Text>
                <Text style={{color: '#636363'}}>
                  {!checkoutDate
                    ? 'Select Date'
                    : checkoutDate.toLocaleDateString('en-GB')}
                </Text>
              </View>
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
                flex: 1,
                justifyContent: 'space-between',
                padding: 15,
                backgroundColor: '#65a33c',
                margin: 15,
              }}
              onPress={handleCheckAvailibilty}>
              <Text style={{color: '#000000', textAlign: 'center'}}>
                Check Availability
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: '#65a33c',
            marginTop: 65,
          }}>
          {data && (
            <CarouselMomentum
              data={data}
              sliderWidth={500}
              itemWidth={200}
              renderItem={({item}) => (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {<Image
                    source={{
                      uri:
                        'https://jowjffblghcteejfsuje.supabase.co/storage/v1/object/public/gallery/' +
                        item.image_name,
                    }}
                    style={{width: 200, height: 200}}
                  />}
                </View>
              )}
              onSnap={onSnap}
              autoPlay={true}
              autoPlayInterval={3000}
              loop={true}
              inactiveScale={0.9}
              showPagination={true}
              removeClippedSubviews={false}
            />
          )}
        </View>

        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 'bold',
            margin: 15,
          }}>
          Escape, Relax, Repeat!
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
            flex: 1,
            justifyContent: 'space-between',
            padding: 15,
            backgroundColor: '#65a33c',
            margin: 15,
            marginBottom: 75,
          }}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 26,
              fontWeight: 'bold',
              margin: 15,
            }}>
            Get full care, Send us your feedback now!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
            <Text style={{color: '#000', textAlign: 'center', fontSize: 18}}>
              Send feedback
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={checkinModal}
          date={checkinDate ? checkinDate : new Date()}
          onConfirm={date => {
            setCheckinModal(false);
            setCheckinDate(date);
          }}
          onCancel={() => {
            setCheckinModal(false);
          }}
          minimumDate={new Date()}
          mode="date"
        />
        <DatePicker
          modal
          open={checkoutModal}
          date={checkoutDate ? checkoutDate : new Date()}
          onConfirm={date => {
            setCheckoutModal(false);
            setCheckoutDate(date);
          }}
          onCancel={() => {
            setCheckoutModal(false);
          }}
          minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          mode="date"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
