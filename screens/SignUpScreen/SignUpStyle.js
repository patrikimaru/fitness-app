import { StyleSheet } from "react-native";

export const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  containerCenter: {
    marginTop:20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginImage: {
    width: 280,
    height: 280,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8
  },
  signUpBtn: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 12
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
    marginLeft: 3
  },
  loginText: {
    fontWeight: 'bold',
    marginLeft: 3
  },
  errorText: {
    color: "#FF3D3D"
  }
});