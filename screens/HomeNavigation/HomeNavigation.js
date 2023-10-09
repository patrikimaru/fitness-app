import HomeTab from '../HomeTabs/HomeTab/HomeTab';
import GoalTab from '../HomeTabs/GoalTab/GoalTab';
import DietTab from '../HomeTabs/DietTab/DietTab';
import SettingsTab from '../HomeTabs/SettingTab/SettingsTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();


const HomeNavigation = () => {
 
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused
              ? 'home'
              : 'home-outline';
            } 
            else if (route.name === 'GoalTab') {
              iconName = focused 
              ? 'disc'
              : 'disc-outline';
            }
            else if (route.name === 'DietTab') {
              iconName = focused 
              ? 'fitness'
              : 'fitness-outline';
            }
            else if (route.name === 'SettingsTab') {
              iconName = focused 
              ? 'settings-sharp'
              : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#191919',
          tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Home',}} name="HomeTab" component={HomeTab} />
        <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Goal', }} name="GoalTab" component={GoalTab} />
        <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Diet', }} name="DietTab" component={DietTab} />
        <Tab.Screen options={{ headerShown: false, tabBarLabel: 'Settings', }} name="SettingsTab" component={SettingsTab} />
    </Tab.Navigator>
  );
};


export default HomeNavigation;