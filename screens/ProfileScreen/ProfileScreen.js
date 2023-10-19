import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStyle } from './ProfileStyle';
import { 
  Text,
  View, 
  TouchableOpacity,
  Image, 
  ScrollView,
} from 'react-native';


const ProfileScreen = () => {
  const [userData, setUserData] = useState(null)
  const navigation = useNavigation();
  const authUser = auth.currentUser;

  const fetchUserData = async () => {
    try {
      if (authUser) {
        const userDocRef = doc(db, 'users', authUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        } else {
          console.log('User document does not exist');
        }
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  
  useEffect(() => {
  
    fetchUserData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={ProfileStyle.scrollView}>
      <TouchableOpacity
        style={ProfileStyle.goBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25}/>
      </TouchableOpacity>
      <View style={ProfileStyle.profileContainer}>
        <Image
            source={{uri: userData.profilePicture}} 
            style={ProfileStyle.profileImage}
          />
      </View>
      <View style={ProfileStyle.containerCenter}>
        <Text style={ProfileStyle.title}>
          {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
        </Text>
        {authUser ? <Text style={ProfileStyle.title2}>{authUser.email}</Text> : null}
      </View>

      <View style={ProfileStyle.cardContainer}>
        <View style={ProfileStyle.row}>
          <Text style={ProfileStyle.pic}>Latest Activities</Text>
          <Text style={ProfileStyle.pic}>Your Progress</Text>
          <Text style={ProfileStyle.pic}>Your Priority</Text>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

