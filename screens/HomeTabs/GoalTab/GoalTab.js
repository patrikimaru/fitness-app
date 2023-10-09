import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { GoalTabStyles } from './GoalTabStyle';

const GoalTab = () => {
  const navigation = useNavigation();
  const [accomplishedGoals, setAccomplishedGoals] = useState([]); 
  const [unaccomplishedGoals, setUnaccomplishedGoals] = useState([]); 
  const user = auth.currentUser

  useEffect(() => {
    const fetchGoals = async () => {
      if (user) {
        const accomplishedQuery = query(collection(db, 'goals'), 
          where('userId', '==', user.uid),
          where('status', '==', 'accomplished')
        );
        const accomplishedSnapshot = await getDocs(accomplishedQuery);
        const accomplishedGoals = accomplishedSnapshot.docs.map(doc => doc.data());

        const unaccomplishedQuery = query(collection(db, 'goals'), 
          where('userId', '==', user.uid),
          where('status', '==', 'unaccomplished')
        );
        const unaccomplishedSnapshot = await getDocs(unaccomplishedQuery);
        const unaccomplishedGoals = unaccomplishedSnapshot.docs.map(doc => doc.data());

        setAccomplishedGoals(accomplishedGoals);
        setUnaccomplishedGoals(unaccomplishedGoals);
      }
    };

    fetchGoals();
  },);
  

  return (
    <SafeAreaView>
      <ScrollView style={GoalTabStyles.container}>
        <View style={GoalTabStyles.spacing}>
          <Text style={GoalTabStyles.title}>My Goals</Text>
          <TouchableOpacity 
            style={{backgroundColor: "#191919", padding: 8, borderRadius: 12, width:'fit-content', marginTop: 8}}
            onPress={() => navigation.push("AddGoalScreen")}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color:"#fff"}}>Create a new goal +</Text>
          </TouchableOpacity>
          <Text style={GoalTabStyles.subtitle}>Accomplished Goals</Text>
          <View style={GoalTabStyles.cardGoalContainer}>
            {accomplishedGoals.length === 0 ?
            <Text>No accomplished goals yet complete a goal</Text> :
            accomplishedGoals.map((goal, index) => (
              <TouchableOpacity key={index} style={GoalTabStyles.cardGoal}
                onPress={() => navigation.push("GoalScreen", {
                  title: goal.title,
                  description: goal.description,
                  percentage: goal.percentage,
                  imgUrl: goal.imgUrl,

                })}>
                <View style={GoalTabStyles.cardGoalLabel}>
                  <View style={GoalTabStyles.cardGoalText}>
                    <Text style={GoalTabStyles.cardGoalTitle}>{goal.title}</Text>
                    <Text>{goal.description}</Text>
                    <Progress.Bar
                      progress={goal.percentage}
                      size={30}
                      color='#191919'
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={GoalTabStyles.subtitle}>Unaccomplished Goals</Text>
          <View style={GoalTabStyles.cardGoalContainer}>
            {unaccomplishedGoals.length === 0 ?
            <Text>No goals yet create a goal to start your fitness journey</Text> :
            unaccomplishedGoals.map((goal, index) => (
              <TouchableOpacity key={index} style={GoalTabStyles.cardGoal}
                onPress={() => navigation.push("GoalScreen", {
                  title: goal.title,
                  description: goal.description,
                  percentage: goal.percentage,
                  imgUrl: goal.imgUrl,

                })}>
                <View style={GoalTabStyles.cardGoalLabel}>
                  <View style={GoalTabStyles}>
                    <Text style={GoalTabStyles.cardGoalTitle}>{goal.title}</Text>
                    <Text>{goal.description}</Text>
                    <Progress.Bar
                      progress={goal.percentage}
                      size={30}
                      color='#191919'
                      style={{ backgroundColor: 'transparent' ,marginTop:5}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default GoalTab;


