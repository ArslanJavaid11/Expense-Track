import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
   
    StyleSheet,
    Text,
 
    TouchableOpacity,
    View,
    TextInput,
    Image,
    ImageBackground,
    Alert,
   
} from 'react-native';

import auth, { firebase } from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient'
import SignUP from './SignUp';
import { useNavigation } from '@react-navigation/native';
// import Animated, { useAnimatedStyle, useSharedValue, Easing, } from 'react-native-reanimated';
// import { Animated } from 'react-native';
function Login({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   

    
    
    const Userlogin = () => {



        
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // console.log('User account signed in');
                navigation.navigate('Home')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    // console.log('That email address is already in use!');
                    Alert.alert('Emai Already in use')
                }

                if (error.code === 'auth/invalid-email') {
                    // console.log('That email address is invalid!');
                    Alert.alert('Invalid Email')
                }
                if (error.code === 'auth/invalid-password') {
                    // console.log('That email address is invalid!');
                    Alert.alert('Invalid Password')
                }

                console.error(error);
            });

    }


    return (

       

            <View style={{ justifyContent: "center", height: "100%",flex:1,backgroundColor: '#f5f5f5',padding: 20,borderRadius: 5, }} >
                
                <View style={{ margin: 20, alignItems: "center", }}>
                    <Image
                        source={require('../components/image.png')}
                        style={{ width: 100, height: 100 }}

                    />
                    <Text style={{ fontSize: 28, color: "#333",fontWeight:'bold',marginBottom: 20}}>
                        Expense Tracker
                    </Text>
                    <Text style={{ fontSize: 16, color: "#666",marginBottom: 30 }}>
                        Keep Track of your Expenses
                    </Text>
                </View>

                <View style={{}}>



                    <View style={{ margin: 20 }}>
                        <TextInput style={{ borderColor: "#ccc",fontSize:16 ,borderWidth: 1, borderRadius: 5, fontWeight: "bold", padding: 10,shadowColor:'#4CAF50',elevation:1 }}
                            placeholder='Enter your Email here'
                            onChangeText={email => setEmail(email)}
                        />
                        <TextInput style={{ borderColor: "#ccc",fontSize:16, borderWidth: 1, borderRadius: 5, fontWeight: "bold", padding: 10, marginTop: 10,shadowColor:'#4CAF50',elevation:1 }}
                            placeholder='Enter your password here'
                            onChangeText={password => setPassword(password)}
                        />

                    </View>
                    <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity
                           
                            // onPress={() => navigation.navigate('Home',)}
                            onPress={() => Userlogin()}
                        >

                            <Text style={{backgroundColor: '#4CAF50', color: "#fff", fontSize: 16, borderColor: "black", borderWidth: 1.5, borderRadius: 5, padding: 10 }}>Login</Text>


                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight:"bold", color: "#666",marginTop:20 }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                           
                            onPress={() => navigation.navigate('SignUp')}
                           >

                            <Text style={{ color: "#4CAF50",textDecorationLine:"underline",fontWeight:"bold",fontSize:25,marginTop:15 }}>Signup</Text>


                        </TouchableOpacity>
                    </View>

                </View>

            </View>
       

    );
}

const styles = StyleSheet.create({

});

export default Login;