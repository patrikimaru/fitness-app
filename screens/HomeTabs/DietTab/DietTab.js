import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { DietTabStyles } from "./DietTabStyle";
import { db, auth } from "../../../firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";



const DietTab = () => {
  const navigation = useNavigation();
  const [dietPlans, setDietPlans] = useState([]);
  const authUser = auth.currentUser;

  useEffect(() => {
    const fetchDietPlans = async () => {
      if (authUser) {
        try {
          const dietPlanQuery = query(
            collection(db, "dietPlans"),
            where("userId", "==", authUser.uid)
          );
    
          const dietPlanSnapshot = await getDocs(dietPlanQuery);
          const dietPlanData = dietPlanSnapshot.docs.map((doc) => doc.data());
          setDietPlans(dietPlanData);
        } catch (error) {
          console.error("Error fetching diet plans: ", error);
        }
      }
    };

    fetchDietPlans();
  }, [authUser]);

  return (
    <SafeAreaView>
      <ScrollView style={DietTabStyles.container}>
        <Text style={DietTabStyles.title}>Today's Meal</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#191919",
            padding: 8,
            borderRadius: 12,
            width: "fit-content",
            marginTop: 8,
          }}
          onPress={() => navigation.push("AddDietPlanScreen")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            Create a new diet plan +
          </Text>
        </TouchableOpacity>
        <FlatList
          data={dietPlans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={DietTabStyles.cardGoal}>
              <Text style={DietTabStyles.mealTitle}>{item.title}</Text>
              {item.items.map((mealItem, index) => (
                <Text key={index}>{mealItem}</Text>
              ))}
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietTab;

