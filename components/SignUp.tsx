import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {

  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,

  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Login from './Login';
import auth from '@react-native-firebase/auth';
function SignUP({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // console.log('User account created');
        navigation.navigate('Login')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

  }

  return (
  
    <View>

      <View style={{ justifyContent: "center", height: "100%" }}>
        <View style={{ margin: 20, alignItems: "center", }}>
          <Image
            source={require('../components/Signup.png')}
            style={{ width: 100, height: 100 }}

          />
          <Text style={{ fontSize: 25, color: "black", fontFamily: "", fontStyle: "italic",marginBottom: 20 }}>
            Create Account
          </Text>
          <Text style={{ fontSize: 25, color: "#4CAF50", fontStyle: "italic",marginBottom: 20 }}>
            &
          </Text>
          <Text style={{ fontSize: 25, color: "black", fontStyle: "italic",marginBottom: 20 }}>
            Take control of your Finances
          </Text>
        </View>
        <View style={{ margin: 20 }}>

          <TextInput style={{ borderColor: "#ccc", fontSize: 16, borderWidth: 1, borderRadius: 5, fontWeight: "bold", padding: 10, shadowColor: '#4CAF50', elevation: 1 }}
            placeholder='Enter your Email here'
            // value='email'
            onChangeText={email => setEmail(email)}
          />
          <TextInput style={{ borderColor: "#ccc", fontSize: 16, borderWidth: 1, borderRadius: 5, fontWeight: "bold", padding: 10, shadowColor: '#4CAF50', elevation: 1, marginTop: 10 }}
            placeholder='Enter your password here'
            // value='password'
            onChangeText={password => setPassword(password)}


          />
        </View>
        <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>


          <TouchableOpacity

            // onPress={() => navigation.navigate('Login') }>
            onPress={() => createUser()}>
            <Text

              style={{ backgroundColor: '#4CAF50', color: "#fff", fontSize: 16, borderColor: "black", borderWidth: 1.5, borderRadius: 5, padding: 10,shadowColor:'#4CAF50',elevation:5 }}>Create Account</Text>


          </TouchableOpacity>
        </View>

      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({

});

export default SignUP;