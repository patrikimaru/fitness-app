import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { auth, signInwithGoogle } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';
import { LoginStyles } from './LoginStyle';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Alert, 
  Modal,  
  Pressable
} from 'react-native';


const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigation = useNavigation();


  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("You have succesfully logged in");
    })
    .catch((error) => {
      alert(error); 
    })
  };


  const forgetPassword = async () => {
    await sendPasswordResetEmail(auth, forgotEmail)
    .then(() => {
      setForgotEmail("");
      setModalVisible(false);
      alert("Password reset email sent");
    }).catch((error) => {
      alert(error)
    })
  }


  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await navigation.replace("HomeScreen");
      } 
    })
    
    return () => {
      listen();
    }
  },);

  return (
    <SafeAreaView style={LoginStyles.container}>
      <KeyboardAvoidingView>
          <View style={LoginStyles.containerCenter}>
            <Image
              style={LoginStyles.loginImage}
              source={require('../../assets/login-image.png')} 
            />
          </View>
          <Text style={LoginStyles.title}>FitTracks</Text>
          <Text>Login to Continue</Text>
          <TextInput
            style={LoginStyles.input}
            value={email}
            placeholder='Enter your email'
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={LoginStyles.input}
            value={password}
            secureTextEntry={true}
            placeholder='Enter your password'
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={LoginStyles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          <TouchableOpacity style={LoginStyles.loginBtn} onPress={handleLogin}>
            <Text style={LoginStyles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={LoginStyles.googleLoginBtn} onPress={signInwithGoogle}>
            <Ionicons name='logo-google' size={25}/>
            <Text style={LoginStyles.googleLoginText}>Sign in with Google</Text>
          </TouchableOpacity>
          <View style={LoginStyles.containerCenter}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
              <Text style={LoginStyles.signUpText}>Sign up now!</Text>
            </TouchableOpacity>
          </View>  
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={LoginStyles.centeredView}>
          
          <View style={LoginStyles.modalView}>
            <Pressable
              style={LoginStyles.exit}
              onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close-circle-outline" size={25}/>
            </Pressable>
            <Text style={LoginStyles.modalText}>Forgot Password</Text>
            <TextInput
              style={LoginStyles.forgotEmail}
              value={forgotEmail}
              placeholder='Enter your email'
              onChangeText={text => setForgotEmail(text)}
            />
            
            <Pressable
              style={[LoginStyles.button, LoginStyles.buttonClose]}
              onPress={() => forgetPassword()}>
              <Text style={LoginStyles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;