import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const NotificationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ padding: 16}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: 'bold',}}>Notifications</Text>
    </SafeAreaView>
  )
}

export default NotificationScreen