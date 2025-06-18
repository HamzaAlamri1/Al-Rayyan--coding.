import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Signin from './src/Siginin';
import Register from './src/Register';
import Checkout from './src/Checkout';
import Myprofile from './src/Myprofile';
import Feedback from './src/Feedback';
import Welcome from './src/Welcome';
import Employees from './src/Employees';
import GalleryManagement from './src/GalleryManagement';
import UsersList from './src/UsersList';
import EmployeesList from './src/EmployeesList';
import ReservationsList from './src/ReservationsList';
import EditProfile from './src/EditProfile';
import NewEmplyee from './src/NewEmplyee';
import FeedbackMessages from './src/FeedbackMessages';
import ThankYou from './src/ThankYou';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerStyle: {backgroundColor: '#f3ede1'}}}>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="My Profile" component={Myprofile} />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{title: 'Make Booking Reservation'}}
            />
            <Stack.Screen name="Sign In" component={Signin} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="New Emplyee" options={{ title: "Add new employee" }} component={NewEmplyee} />
            <Stack.Screen name="Employees" options={{ title: "Employees Dashboard" }} component={Employees} />
            <Stack.Screen name="Reservations List" component={ReservationsList} />
            <Stack.Screen name="Employees List" component={EmployeesList} />
            <Stack.Screen name="Users List" component={UsersList} />
            <Stack.Screen name="Gallery Management" component={GalleryManagement} />
            <Stack.Screen name="Feedback Messages" component={FeedbackMessages} />
            <Stack.Screen name="Thank You" component={ThankYou} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
