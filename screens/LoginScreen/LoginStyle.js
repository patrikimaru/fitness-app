import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
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
  passwordInput: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    marginTop: 8,
    borderRadius: 8,
    padding: 12,
  },
  loginBtn: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 12
  },
  googleLoginBtn: {
    gap:10,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderRadius: 12
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  googleLoginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191919',
    marginVertical: 8,
  },
  signUpText: {
    marginLeft: 3,
    color: '#1877f2',

  },
  forgotText: {
    color: '#1877f2',
    textAlign: 'right',
    marginLeft: 3,
    marginTop:8
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  forgotEmail: {
    width: 300,
    marginTop: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8
  },
  button: {
    width: 300,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: '#191919',
  },
  buttonClose: {
    backgroundColor: '#191919',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
    textAlign: 'center',
  },
  exit: {
    alignSelf: 'flex-end'
  }
});