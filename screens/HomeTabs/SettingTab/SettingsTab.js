import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AccountSettingsList } from '../../../data/AccountSettingsList';
import { useState, useEffect } from 'react';
import { auth , db, storage } from '../../../firebase';
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { settingStyles } from './SettingStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import { 
  changeInfoInitialValue, 
  changeInfoSchema, 
  changePasswordInitialValue, 
  changePasswordSchema 
} from './SettingsTabValidation';


const SettingsTab = () => {
  const navigation = useNavigation();
  const [image,setImage] = useState(null)
  const [userData, setUserData] = useState(null);
  const [changeInfoModalVisible, setChangeInfoModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const authUser = auth.currentUser


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      const source = { uri: result.uri };
      console.log('Image Source:', source);
      setImage(source);
  
      const storageRef = ref(storage, `user-profiles/${authUser.uid}/profile-picture.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, result.uri);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
        },
        (error) => {
          console.error("Error uploading image: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const userDocRef = doc(db, "users", authUser.uid);
            setDoc(userDocRef, { profilePicture: downloadURL }, { merge: true })
              .then(() => {
                alert("Image uploaded and URL stored in Firestore.");
              })
              .catch((error) => {
                console.error("Error storing download URL in Firestore: ", error);
              });
          });
        }
      );
    }
  };
  
  
  

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
  
  

  const handleChangeInfo = async (values) => {
    const { firstName, lastName } = values;
    try {
       if (authUser) {
        const userDocRef = doc(db, 'users', authUser.uid);
        await updateDoc(userDocRef, {
          firstName: firstName,
          lastName: lastName,
        });
        alert("You have succesfully changed you name")
        setChangeInfoModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  }
  
  
  const handleChangePassword = async (values) => {
    const { oldPassword, password } = values;
    console.log(password)
    try {
      if (authUser) {
        const credential = EmailAuthProvider.credential(authUser.email, oldPassword);
        await reauthenticateWithCredential(authUser, credential);
  
        await updatePassword(authUser, password);
  
        alert("You have successfully changed your password");
        setChangePasswordModalVisible(false);
      }
      
    } catch (error) {
      alert('Error updating password:', error.message);
    }
  }
  
  useEffect(() => {

    fetchUserData();

  }, []);

  
  return (
    <SafeAreaView style={settingStyles.container}>
      <ScrollView style={settingStyles.scrollView}>
          <View style={settingStyles.container}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={settingStyles.userProfile}
              source={
                image
                  ? { uri: image.uri }
                  : { uri: 'https://i.stack.imgur.com/l60Hf.png' }
              }
            />
          </TouchableOpacity>


            <Text style={settingStyles.title}>
              {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
            </Text>
            {authUser ? <Text style={settingStyles.title2}>{authUser.email}</Text> : null}
          </View>
          <View style={settingStyles.cardContainer}>
            <Text style={settingStyles.title}>Account Settings</Text>
            <View style={settingStyles.cardSettings}>
              {AccountSettingsList.map((setting, index) => (
                <Pressable 
                  key={index}
                  style={settingStyles.cardSettingsBtn} 
                  onPress={() => {
                    if (setting.label === 'Edit Personal Information') {
                      setChangeInfoModalVisible(true);
                    } else if (setting.label === 'Change Password') {
                      setChangePasswordModalVisible(true);
                    }
                  }} >
                  <View style={settingStyles.cardSettingsBtnLabel}>
                    <Ionicons name={setting.icon} size={18}/>
                    <Text>{setting.label}</Text>
                  </View>
                  <Ionicons name="arrow-forward-outline" size={25} color="#191919"/>
                </Pressable>
              ))}
            </View>
          </View>
          <TouchableOpacity style={settingStyles.logoutBtn} onPress={() => {
            alert("Are you sure you want to logout?")
            signOut(auth); 
            navigation.replace("LoginScreen")
            }}>
            <Text style={settingStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={changeInfoModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setChangeInfoModalVisible(!changeInfoModalVisible)
        }}>
        <View style={settingStyles.centeredView}>
          
          <View style={settingStyles.modalView}>
            <Pressable
              style={settingStyles.exit}
              onPress={() => setChangeInfoModalVisible(!changeInfoModalVisible)}>
                <Ionicons name="close-circle-outline" size={25}/>
            </Pressable>
            <Text style={settingStyles.modalText}>Change Personal Informaion</Text>
            
            <Formik
              initialValues={changeInfoInitialValue}
              validationSchema={changeInfoSchema}
              onSubmit={handleChangeInfo}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) =>  (
                <>
                  <TextInput
                    style={settingStyles.modalInput}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    placeholder='Change your first name'
                  />
                  {errors.firstName&& touched.firstName ? (
                  <Text style={settingStyles.errorText}>{errors.firstName}</Text>
                  ) : null}
                  <TextInput
                    style={settingStyles.modalInput}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    placeholder='Change your last name'
                  />
                  {errors.lastName && touched.lastName ? (
                    <Text style={settingStyles.errorText}>{errors.lastName}</Text>
                    ) : null}
                  
                  <Pressable
                    style={[settingStyles.button, settingStyles.buttonClose]}
                    onPress={handleSubmit}>
                    <Text style={settingStyles.textStyle}>Submit</Text>
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setChangePasswordModalVisible(!changePasswordModalVisible)
        }}>
        <View style={settingStyles.centeredView}>
          
          <View style={settingStyles.modalView}>
            <Pressable
              style={settingStyles.exit}
              onPress={() => setChangePasswordModalVisible(!changePasswordModalVisible)}>
                <Ionicons name="close-circle-outline" size={25}/>
            </Pressable>
            <Text style={settingStyles.modalText}>Change your Password</Text>
            <Formik
              initialValues={changePasswordInitialValue}
              validationSchema={changePasswordSchema}
              onSubmit={handleChangePassword}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) =>  (
              <>
                <TextInput
                  style={settingStyles.modalInput}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  value={values.oldPassword}
                  placeholder='Enter your old password'
                  secureTextEntry={true}
                />

                {errors.oldPassword && touched.oldPassword ? (
                <Text style={settingStyles.errorText}>{errors.oldPassword}</Text>
                ) : null}
                <TextInput
                  style={settingStyles.modalInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder='Enter your new password'
                  secureTextEntry={true}
                />
                {errors.password && touched.password ? (
                <Text style={settingStyles.errorText}>{errors.password}</Text>
                ) : null}
                
                <TextInput
                  style={settingStyles.modalInput}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder='Confirm your new password'
                  secureTextEntry={true}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={settingStyles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
                <Pressable
                  style={[settingStyles.button, settingStyles.buttonClose]}
                  onPress={handleSubmit}>
                  <Text style={settingStyles.textStyle}>Submit</Text>
                </Pressable>
              </>
            )}
            </Formik>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};



export default SettingsTab;