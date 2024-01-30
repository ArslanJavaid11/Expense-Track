import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,

  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import auth, { firebase } from '@react-native-firebase/auth';
const db = firebase.database();

function Home({ navigation }) {

  const [items, setItem] = useState([]);
  const [money, setMoney] = useState('');
  const [budget, setBudget] = useState('');
  const [text, setText] = useState('');


  let updatedBudget = parseInt(budget) - parseInt(money);
  const onSubmit = () => {

   


    if (text !== '' && money !== '' && budget !== '') {
      const newItem = [text, money, budget, updatedBudget];

      setItem([...items, newItem]);



      const user = auth().currentUser;
      db.ref(`users/${user.uid}/items`).push(newItem);
      db.ref(`users/${user.uid}/budget`).set(updatedBudget);


    }





  };

  const fetchItems = () => {
    const user = auth().currentUser;
    database().ref(`users/${user.uid}/items`).on('value', (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setItem(Object.values(data));
        // setBudget(updatedBudget.toString())

      }


    });

  };

  const getBudget = async () => {
    try {
      const user = auth().currentUser;
      const snapshot = await db.ref(`users/${user.uid}/budget`).once('value');
      setBudget(snapshot.val());
    } catch (error) {
      console.log('Error fetching budget: ', error);
    }
  };

  useEffect(() => {
    fetchItems();


    getBudget();

  }, []);



  const SignOut = () => {



    const user = auth().currentUser;
    db.ref(`users/${user.uid}/items`).off();

    auth()
      .signOut()
      .then(() => {
        console.log('User account signed out');
        navigation.navigate('Login')
      })
  }

  return (

    <LinearGradient
      style={{ flex: 1 }}
      colors={['#4CAF50', 'green']}

      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "flex-end", margin: 20 }}>

        <Button
          color={"goldenrod"}
          title='Signout'


          onPress={() => SignOut()}

        />

      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white", fontStyle: "italic" }}>
          My budget
        </Text>

        <TextInput style={{
          color: "black", backgroundColor: "white", fontSize: 15, borderWidth: 0.3, height: 40, width: 200, marginBottom: 20
          , borderRadius: 15
        }}
          placeholder='Enter Your Budget'
          keyboardType='numeric'
          onChangeText={budget => setBudget(budget)}


        />


      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
        <Text style={{
          color: "white", fontSize: 20,
          fontStyle: "italic"
        }}>
          Remaining Budget
        </Text>
        <Text style={{
          color: "white", borderWidth: 0.3, fontSize: 20
          , borderRadius: 5
        }}>
          {budget}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ margin: 20, fontSize: 25, fontWeight: "bold", color: "black", fontStyle: "italic" }}>
            Expenses
          </Text>
          <View style={{ borderWidth: 1.0, borderColor: "lavender", }} />

          <View style={{ margin: 20 }}>
            <Text style={{ fontWeight: "bold" }}>
              Item
            </Text>
            <TextInput style={{
               padding:10,shadowColor:'black',elevation:2, borderColor: "#ccc",color: "black", fontSize: 15, borderWidth: 0.3, height: 40, width: 200, marginBottom: 20

            }}
              placeholder='Enter Item'

              value={text}
              onChangeText={text => setText(text)} />

            <Text style={{ fontWeight: "bold" }}>
              Spent Money
            </Text>
            <TextInput style={{
             padding:10,shadowColor:'black',elevation:2, borderColor: "#ccc",color: "black", fontSize: 15, borderWidth: 1, height: 40, width: 200, marginBottom: 20

            }}
              placeholder='Enter Spent Money'

              onChangeText={money => setMoney(money)}
              keyboardType="numeric"
            />
            <View style={{ borderWidth: 2.0, borderColor: "lavender", }} />

          </View>
          <ScrollView>
            <View style={{backgroundColor:'#f2f2f2', margin: 20, justifyContent: "space-around", flexDirection: "column", borderWidth: 1, borderRadius: 5,shadowColor:"#4CAF50",elevation:1,padding:10 }}>







              {items.map((items, index) => (

                <Text style={{ fontSize: 20,fontWeight: 'bold',marginBottom: 5,}}
                key={index}>Item: {items[0]} - Spent Money: {items[1]} </Text>
                // <Text key={index}>Item: {items.items} - Money: {items.money}Remaining: {items[3]}</Text>
              ))}
             


            </View>
          </ScrollView>
        </View>






        <View style={{ margin: 20 }}>
          <Button
            color={"#4CAF50"}
            title='Add Expense'

            onPress={() => onSubmit()}
            
          />

        </View>
      </View>
    </LinearGradient>

  )
}

const styles = StyleSheet.create({

})



export default Home;