import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { 
  Text,
  TouchableOpacity,
} from "react-native";

const AddDietPlanScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ padding: 16}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: 'bold',}}>Add a Diet Plan</Text>
    </SafeAreaView>
  )
}

export default AddDietPlanScreen