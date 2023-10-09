import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from '../../firebase';
import { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context"
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { Formik } from 'formik';
import { SignUpStyles } from './SignUpStyle';
import { signUpInitialValue, signUpSchema } from './SignUpValidation';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';


const SignUpScreen = () => {
  const navigation = useNavigation();

  const [authUser, setAuthUser] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleSignUp = async (values) => {
    const { firstName, lastName ,email, password } = values;

    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;

    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
  }

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        navigation.replace("HomeScreen");
      } 
    })
      
    return () => {
      listen();
    }
  }, []);

  return (
      <SafeAreaView style={SignUpStyles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={25}/>
        </TouchableOpacity>
          <Text style={SignUpStyles.title}>Create Account</Text>
          <Text>Sign up now to gain access in our app!</Text>
            <Formik
              initialValues={signUpInitialValue}
              validationSchema={signUpSchema}
              onSubmit={handleSignUp}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) =>  (
              <View>
              <Text>First Name</Text>
              <TextInput
                style={SignUpStyles.input}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                placeholder='John'
              />
              {errors.firstName && touched.firstName ? (
                <Text style={SignUpStyles.errorText}>{errors.firstName}</Text>
                ) : null}
              <Text>Last Name</Text>
              <TextInput
                style={SignUpStyles.input}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                placeholder='Doe'
              />
              {errors.lastName && touched.lastName ? (
                <Text style={SignUpStyles.errorText}>{errors.lastName}</Text>
                ) : null}
              <Text>Email</Text>
              <TextInput
                style={SignUpStyles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder='Enter your email'
              />
              {errors.email && touched.email ? (
                <Text style={SignUpStyles.errorText}>{errors.email}</Text>
                ) : null}
              <Text>Password</Text>
              <View style={SignUpStyles.passwordInput}>
                <TextInput
                  style={{width: '100%'}}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder='Password must be atleast 6 characters'
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color={passwordVisible ? 'gray' : 'black'}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password ? (
                <Text style={SignUpStyles.errorText}>{errors.password}</Text>
                ) : null}
              <Text>Confirm Password</Text>
              <View style={SignUpStyles.passwordInput}>
                <TextInput
                  style={{width: '100%'}}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder='Password must match'
                  secureTextEntry={!confirmPasswordVisible}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <Ionicons
                    name={confirmPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color={confirmPasswordVisible ? 'gray' : 'black'}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={SignUpStyles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
              
              <TouchableOpacity style={SignUpStyles.signUpBtn} onPress={handleSubmit}>
                <Text style={SignUpStyles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={SignUpStyles.containerCenter}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
                  <Text style={SignUpStyles.loginText}>Login now!</Text>
                </TouchableOpacity>
              </View>
          </View>
        )}
      </Formik>  
    </SafeAreaView>
  );
};

export default SignUpScreen;