
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { DietTabStyles } from "./DietTabStyle";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";


const DietTab = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView style={DietTabStyles.container}>
        <Text style={DietTabStyles.title}>Today's Meal</Text>
        <TouchableOpacity 
            style={{backgroundColor: "#191919", padding: 8, borderRadius: 12, width:'fit-content', marginTop: 8}}
            onPress={() => navigation.push("AddDietPlanScreen")}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color:"#fff"}}>Create a new diet plan +</Text>
        </TouchableOpacity>
        <View style={DietTabStyles.cardGoalContainer}>
          <View style={DietTabStyles.cardGoal}>
            <Text style={DietTabStyles.mealTitle}>Breakfast:</Text>
            <Text>Bread</Text>
            <Text>Egg</Text>
            <Text>Coffee</Text>
          </View>
          <View style={DietTabStyles.cardGoal}>
            <Text style={DietTabStyles.mealTitle}>Lunch:</Text>
            <Text>Adobong Manok</Text>
            <Text>1/2 rice</Text>
          </View>
          <View style={DietTabStyles.cardGoal}>
            <Text style={DietTabStyles.mealTitle}>Dinner:</Text>
            <Text>Chopsuey</Text>
            <Text>1/2 rice</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietTab;

