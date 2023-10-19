import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { DietTabStyles } from "./DietTabStyle";
import { db, auth } from "../../../firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";

const DietTab = () => {
  const navigation = useNavigation();
  const [dietPlans, setDietPlans] = useState([]);
  const authUser = auth.currentUser;

  const isHealthyFood = (food) => {
    const healthyKeywords = ["vegetables","vegetable", "fruits", "lean protein", "whole grains", "nuts", "seeds", "fish", "poultry", "legumes", "low-fat", "organic"];
    
    for (const keyword of healthyKeywords) {
      if (food.toLowerCase().includes(keyword)) {
        return "Healthy";
      }
    }

    return "Not Healthy";
  };

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

          // Update the diet plan data to include the healthiness of each food item
          const dietPlanWithHealth = dietPlanData.map((plan) => ({
            ...plan,
            itemsWithHealth: plan.items.map((item) => ({
              name: item,
              health: isHealthyFood(item),
            })),
          }));

          setDietPlans(dietPlanWithHealth);
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
              {item.itemsWithHealth.map((mealItem, index) => (
                <Text key={index}>
                  {mealItem.name} - {mealItem.health}
                </Text>
              ))}
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietTab;
