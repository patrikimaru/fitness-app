import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityChart from '../../../components/ActivityChart';
import * as Progress from 'react-native-progress';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
  Pressable
} from 'react-native';


const HomeTab = () => {
  const [authUser, setAuthUser] = useState(null);
  const [userGoals, setUserGoals] = useState([]); 
  const navigation = useNavigation();


  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        
        const q = query(collection(db, 'goals'), where('userId', '==', user.uid));
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
      } else {
        setAuthUser(null);
        navigation.replace('LoginScreen');
      }
    });

    return () => {
      listen();
    };
  }, [authUser, userGoals]);


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={HomeStyles.container}>
          <View style={HomeStyles.header}>
            <Pressable onPress={() => navigation.push("NotificationScreen")}>
              <Ionicons name="notifications-outline" size={25}/>
            </Pressable>
            <Pressable onPress={() => navigation.push("ProfileScreen")}>
              <Image 
                style={HomeStyles.userProfile}
                source={{uri: 'https://i.stack.imgur.com/l60Hf.png'}} 
              />
            </Pressable>
          </View>
          <Text style={HomeStyles.title}>FitTracks</Text>
          <View style={HomeStyles.greetings}>
            <Text>Hi!</Text>
            {authUser ? <Text style={HomeStyles.email}>{authUser.email}</Text> : null}
          </View>
          <ActivityChart />
          <View style={HomeStyles.header}>
            <Text style={HomeStyles.subTitle}>Recent Goals</Text>
            <TouchableOpacity onPress={() => navigation.push("AddGoalScreen")}>
              <Text>Create a new goal +</Text>
            </TouchableOpacity>
          </View>
          
          <View style={HomeStyles.cardGoalContainer}>
            {
              userGoals.length === 0 ?
                <Text>No goals yet</Text>:
                userGoals.map((goal, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={HomeStyles.cardGoal}
                    onPress={() => navigation.push("GoalScreen", {
                      title: goal.title,
                      category: goal.category,
                      description: goal.description,
                      percentage: goal.percentage,

                    })}>
                      <View style={HomeStyles.cardGoalLabel}>

                      <View style={HomeStyles.cardGoalText}>
                        <Text style={HomeStyles.cardGoalTitle}>
                          {goal.title.length > 12
                            ? goal.title.slice(0, 17 - 3) + "..."
                            : goal.title}
                        </Text>
                        <Text>{goal.category}</Text>
                      </View> 
                      </View>
                      <Progress.Bar progress={goal.percentage} size={30} color='#191919' style={{backgroundColor: 'transparent'}} />
                  </TouchableOpacity>
                
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeTab;