import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { GoalTabStyles } from './GoalTabStyle';
import { 
  View,
  Text, 
  TouchableOpacity,
  ScrollView,
  FlatList,
 } from 'react-native';

const GoalTab = () => {
  const navigation = useNavigation();
  const [accomplishedGoals, setAccomplishedGoals] = useState([]); 
  const [unaccomplishedGoals, setUnaccomplishedGoals] = useState([]); 
  const authUser = auth.currentUser

  useEffect(() => {
    const fetchGoals = async () => {
      if (authUser) {
        const accomplishedQuery = query(collection(db, 'goals'), 
          where('userId', '==', authUser.uid),
          where('status', '==', 'accomplished')
        );
        const accomplishedSnapshot = await getDocs(accomplishedQuery);
        const accomplishedGoals = accomplishedSnapshot.docs.map(doc => doc.data());

        const unaccomplishedQuery = query(collection(db, 'goals'), 
          where('userId', '==', authUser.uid),
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
          <FlatList
              data={accomplishedGoals}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={GoalTabStyles.cardGoal}
                  onPress={() =>
                    navigation.push('GoalScreen', {
                      title: item.title,
                      description: item.description,
                      percentage: item.percentage,
                      imgUrl: item.imgUrl,
                    })
                  }
                >
                  <View style={GoalTabStyles.cardGoalLabel}>
                    <View style={GoalTabStyles.cardGoalText}>
                      <Text style={GoalTabStyles.cardGoalTitle}>{item.title}</Text>
                      <Text>{item.description}</Text>
                      <Progress.Bar
                        progress={item.percentage}
                        size={30}
                        color="#191919"
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <Text>No accomplished goals yet. Complete a goal.</Text>
              )}
            />
          </View>

          <Text style={GoalTabStyles.subtitle}>Unaccomplished Goals</Text>
          <FlatList
            data={unaccomplishedGoals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={GoalTabStyles.cardGoal}
                onPress={() =>
                  navigation.push('GoalScreen', {
                    title: item.title,
                    description: item.description,
                    percentage: item.percentage,
                    imgUrl: item.imgUrl,
                  })
                }
              >
                <View style={GoalTabStyles.cardGoalLabel}>
                  <View style={GoalTabStyles.cardGoalText}>
                    <Text style={GoalTabStyles.cardGoalTitle}>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Progress.Bar
                      progress={item.percentage}
                      size={30}
                      color="#191919"
                      style={{ backgroundColor: 'transparent', marginTop: 5 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Text>No goals yet. Create a goal to start your fitness journey.</Text>
            )}
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default GoalTab;


