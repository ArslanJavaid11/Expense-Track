import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';
function Expense({ navigation}) {

    const [exp, setExp] = useState("");

    return (

        <LinearGradient
            style={{ flex: 1 }}
            colors={['purple', 'white']}

            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={{ flexDirection: "row", justifyContent: "flex-end", margin: 20 }}>



            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "royalblue" }}>
                    Adding Expense
                </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "whitesmoke", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <View style={{ flex: 1, margin: 20 }}>
                    <View >
                        <Text style={{ fontWeight: "bold" }}>
                            Expense
                        </Text>
                        <TextInput style={{
                            color: "black", fontSize: 15, borderWidth: 0.3, height: 40, width: 200,marginBottom:20

                        }}
                            placeholder='Enter Expense'
                            value={exp}
                            onChangeText={exp => setExp(exp)} />
                    </View>
                    <Button
                        color={"olive"}
                        title='Add Expense'


                        onPress={() => navigation.navigate('Home')}

                    />
                    {/* <View style={{ borderWidth: 1.0, borderColor: "lavender", }} /> */}
                </View>

            </View>
        </LinearGradient>
















    )
}

const styles = StyleSheet.create({

})



export default Expense;