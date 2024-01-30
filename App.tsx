/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUP from './components/SignUp';
import Home from './components/HomeScreen';
import  { firebase } from '@react-native-firebase/auth';

function App() {
  
const Stack = createNativeStackNavigator();
const [user, setUser] = useState(null);
useEffect(() => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return () => unsubscribe();
}, []);

return (
  
  <NavigationContainer>
    <Stack.Navigator>

    {user === null ? (
        <>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUP} options={{ headerShown: false }} />

      </>
      ) : (

      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      )}
     
      {/* <Stack.Screen name="Expense" component={Expense} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  </NavigationContainer>
 
);
}

const styles = StyleSheet.create({

});

export default App;
