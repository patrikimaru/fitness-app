import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import AddGoalScreen from './screens/AddGoalScreen/AddGoalScreen';
import GoalScreen from './screens/GoalScreen/GoalScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import HomeNavigation from './screens/HomeNavigation/HomeNavigation';
import NotificationScreen from './screens/NotificationScreen/NotificationScreen';
import AddDietPlanScreen from './screens/AddDietPlanScreen/AddDietPlanScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} /> 
        <Stack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen} />  
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeNavigation} />
        <Stack.Screen options={{ headerShown: false }} name="AddGoalScreen" component={AddGoalScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddDietPlanScreen" component={AddDietPlanScreen} />  
        <Stack.Screen options={{ headerShown: false }} name="GoalScreen" component={GoalScreen} /> 
        <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name="NotificationScreen" component={NotificationScreen} />  
      </Stack.Navigator>
    </NavigationContainer>
  )};



export default App;