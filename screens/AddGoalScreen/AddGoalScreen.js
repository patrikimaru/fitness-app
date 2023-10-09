import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      const user = auth.currentUser;

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
        userId: user.uid
      });

      alert("You have successfully added a goal!");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <Text style={styles.title}>Add Goal</Text>
      <Text style={styles.label}>Select a category</Text>
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
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        placeholder="Enter a title here"
        onChangeText={(text) => setTitle(text)}
        
      />
      <Text style={styles.label}>What are you trying to achieve?</Text>
      <TextInput
        style={styles.input}
        value={description}
        placeholder="Enter a description here"
        onChangeText={(text) => setDescription(text)}
        numberOfLines={4}
        multiline
      />
      <TouchableOpacity
        style={[styles.createButton, !formValid && styles.disabledButton]}
        onPress={formValid ? handleCreateGoal : null}
        disabled={!formValid}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
  },
  createButton: {
    backgroundColor: "#191919",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#ccc", 
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddGoalScreen;
