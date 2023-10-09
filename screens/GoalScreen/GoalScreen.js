import * as Progress from 'react-native-progress';
import Ionicons from "react-native-vector-icons/Ionicons";
import Calendar from '../../components/Calendar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GoalScreenStyles } from './GoalScreenStyle';
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
} from 'react-native';

const GoalScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title, description, percentage, category } = route.params;

  return (
    <SafeAreaView style={GoalScreenStyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <ScrollView>
        <Text style={GoalScreenStyles.title}>{title}</Text>
        <Text style={GoalScreenStyles.category}>{category}</Text>
        <Text style={GoalScreenStyles.description}>{description}</Text>

        <Text>Progress: </Text>
        <Progress.Bar
          progress={percentage}
          size={30}
          color='#191919'
          style={GoalScreenStyles.progressBar}
        />

        <Calendar/>
      </ScrollView>
      
    </SafeAreaView>
  );
}



export default GoalScreen;
