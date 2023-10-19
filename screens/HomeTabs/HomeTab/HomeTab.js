import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityChart from '../../../components/ActivityChart';
import * as Progress from 'react-native-progress';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStyles } from './HomeTabStyle';
import { 
  collection, 
  query, 
  where, 
  getDocs 
} from "firebase/firestore";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable, 
  FlatList
} from 'react-native';


const HomeTab = () => {
  const [userGoals, setUserGoals] = useState([]); 
  const navigation = useNavigation();
  const authUser = auth.currentUser

  useEffect(() => {
    const fetchData = async () => {
      if (authUser) {
        try {
          const q = query(collection(db, 'goals'), 
          where('userId', '==', authUser.uid));
          const querySnapshot = await getDocs(q);

          const goals = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            goals.push({
              title: data.title,
              description: data.description,
              category: data.category,
              progress: data.progress, 
            });
          });

          setUserGoals(goals);
        } catch (error) {
          console.error('Error fetching user goals:', error);
        }
      } else {
        setAuthUser(null);
        navigation.replace('LoginScreen');
      }
    };

    fetchData();
  },);


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={HomeStyles.container}>
          <View style={HomeStyles.header}>
            <View>
              <Text style={HomeStyles.title}>FitTracks</Text>
              <View style={HomeStyles.greetings}>
                <Text style={{color: '#fff'}}>Hi!</Text>
                {authUser ? <Text style={HomeStyles.email}>{authUser.email}</Text> : null}
              </View>
              </View>
           <View style={HomeStyles.headerButtonContainer}>
            <Pressable onPress={() => navigation.push("NotificationScreen")}>
                <Ionicons name="notifications-outline" size={25} color="#fff"/>
              </Pressable>
              <Pressable onPress={() => navigation.push("ProfileScreen")}>
                <Image 
                  style={HomeStyles.userProfile}
                  source={{uri: 'https://i.stack.imgur.com/l60Hf.png'}} 
                />
              </Pressable>
           </View>
          </View>
        
         <View style={HomeStyles.mainContent}>
          <ActivityChart />
            <View style={HomeStyles.subHeader}>
              <Text style={HomeStyles.subTitle}>Recent Goals</Text>
              <TouchableOpacity onPress={() => navigation.push("AddGoalScreen")}>
                <Text>Create a new goal +</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={userGoals}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={HomeStyles.cardGoal}
                  onPress={() =>
                    navigation.push('GoalScreen', {
                      title: item.title,
                      category: item.category,
                      description: item.description,
                      percentage: item.progress, 
                    })
                  }
                >
                  <View style={HomeStyles.cardGoalLabel}>
                    <View style={HomeStyles.cardGoalText}>
                      <Text style={HomeStyles.cardGoalTitle}>
                        {item.title.length > 12
                          ? item.title.slice(0, 17 - 3) + '...'
                          : item.title}
                      </Text>
                      <Text>{item.category}</Text>
                    </View>
                  </View>
                  <Progress.Bar
                    progress={item.progress}
                    size={30}
                    color="#191919"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeTab;