import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProfileScreen = () => {
  const [userData, setUserData] = useState(null)
  const [authUser, setAuthUser] = useState(null);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      if (authUser) {
        const userDocRef = doc(db, 'users', authUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        } else {
          console.log('User document does not exist');
        }
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  
  useEffect(() => {
    

    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        fetchUserData();
      } else {
        setAuthUser(null);
        navigation.replace('LoginScreen');
      }
    });
  
    return () => {
      listen();
    };
  }, [authUser]);

  return (
    <SafeAreaView>
      <ScrollView style={ProfileTabStyle.scrollView}>
      <TouchableOpacity
        style={ProfileTabStyle.goBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <View style={ProfileTabStyle.profileContainer}>
        <Image
            source={{uri: 'https://i.stack.imgur.com/l60Hf.png'}} 
            style={ProfileTabStyle.profileImage}
          />
      </View>
      <View style={ProfileTabStyle.containerCenter}>
        <Text style={ProfileTabStyle.title}>
          {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
        </Text>
        {authUser ? <Text style={ProfileTabStyle.title2}>{authUser.email}</Text> : null}
      </View>

      <View style={ProfileTabStyle.cardContainer}>
        <View style={ProfileTabStyle.row}>
          <Text style={ProfileTabStyle.pic}>Latest Activities</Text>
          <Text style={ProfileTabStyle.pic}>Your Progress</Text>
          <Text style={ProfileTabStyle.pic}>Your Priority</Text>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

export const ProfileTabStyle = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
  },
  goBack: {
    margin: 20
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 25,
    paddingTop: 30,
    fontWeight:'bold',
  },

  title2: {
    paddingTop: 5,
    fontWeight:'300',
  },

  containerCenter: {
    display: 'flex',
    padding: 20,
    alignItems: 'center',
  },
  cardContainer:{
    padding:20,
  },

  pic: {
    padding:20,
    marginTop:3,
    borderRadius: 8,
  },

  card: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'gray',
    backgroundColor: '#fafafa',
    display:'flex',
    flexDirection:'column',
    margin:'auto',
    marginTop:20,
    paddingTop:10,
    justifyContent:'space-between',
    backgroundColor: 'white',
  },
  row: {
    display:'flex',
    flexDirection:'row',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent:'space-evenly',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'gray',
    backgroundColor: '#fafafa',
    padding:10,
  },
  scrollView: {
  },
});
