import { useState, useEffect } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const AddDietPlanScreen = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");
  const [formValid, setFormValid] = useState(false);
  const authUser = auth.currentUser;
  const navigation = useNavigation();


  useEffect(() => {
    setFormValid(title.trim() !== "" && items.trim() !== "");
  }, [title, items]);

  const handleCreateDietPlan = async () => {
    try {
      const dietQuery = query(collection(db, "dietPlans"), where("title", "==", title));
      const querySnapshot = await getDocs(dietQuery);

      if (!querySnapshot.empty) {
        alert("A diet plan with the same title already exists. Please choose a different title.");
        return; 
      }

      await addDoc(collection(db, "dietPlans"), {
        title: title,
        items: items.split(",").map((item) => item.trim()),
        userId:  authUser.uid, 
      });

      alert("You have successfully added a diet plan!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Add a Diet Plan</Text>

      <Text style={{ marginTop: 10 }}>Title</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={{ marginTop: 10 }}>Items (comma-separated)</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
        value={items}
        onChangeText={(text) => setItems(text)}
      />

      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: formValid ? "green" : "gray",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={formValid ? handleCreateDietPlan : null}
        disabled={!formValid}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Create Diet Plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddDietPlanScreen;
