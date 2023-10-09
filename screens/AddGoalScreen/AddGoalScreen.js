import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { AddGoalScreenStyles } from "./AddGoalScreenStyle";
import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore"; 
import {
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AddGoalScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [formValid, setFormValid] = useState(false);
  const categories = [ "Eating healthy", "Outside Activities", "Indoor Activities",];

  useEffect(() => {
    setFormValid(title.trim() !== "" && category !== "" && description.trim() !== "");
  }, [title, category, description]);

  const handleCreateGoal = async () => {
    try {


      const goalQuery = query(collection(db, "goals"), where("title", "==", title));
      const querySnapshot = await getDocs(goalQuery);

      if (!querySnapshot.empty) {
        alert("A goal with the same title already exists. Please choose a different title.");
        return; 
      }

      await addDoc(collection(db, "goals"), {
        title: title,
        description: description,
        category: category,
        progress: 0,
        status: "unaccomplished",
        userId: auth.currentUser.uid, 
      });

      alert("You have successfully added a goal!");

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SafeAreaView style={AddGoalScreenStyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <Text style={AddGoalScreenStyles.title}>Add Goal</Text>
      <Text style={AddGoalScreenStyles.label}>Select a category</Text>
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem) => {
          setCategory(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <Text style={AddGoalScreenStyles.label}>Title</Text>
      <TextInput
        style={AddGoalScreenStyles.input}
        value={title}
        placeholder="Enter a title here"
        onChangeText={(text) => setTitle(text)}
        
      />
      <Text style={AddGoalScreenStyles.label}>What are you trying to achieve?</Text>
      <TextInput
        style={AddGoalScreenStyles.input}
        value={description}
        placeholder="Enter a description here"
        onChangeText={(text) => setDescription(text)}
        numberOfLines={4}
        multiline
      />
      <TouchableOpacity
        style={[AddGoalScreenStyles.createButton, !formValid && AddGoalScreenStyles.disabledButton]}
        onPress={formValid ? handleCreateGoal : null}
        disabled={!formValid}
      >
        <Text style={AddGoalScreenStyles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddGoalScreen;
