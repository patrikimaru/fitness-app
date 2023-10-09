import { StyleSheet } from "react-native";

export const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  userProfile: {
    width: 150,
    height: 150,
    borderRadius: 300,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#191919"
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    marginTop: 20,
    padding:20,
    alignSelf: 'stretch',
  },
  cardSettings: {
    alignSelf: 'stretch',
    padding: 8,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'gray',
    backgroundColor: '#fafafa',
  },
  name: {
    fontSize: 24,
    fontWeight: '600'
  },
  title: {
    fontSize: 25,
    paddingTop: 30,
    fontWeight:'bold',
  },

  title2: {
    paddingTop: 5,
    fontWeight:'300',
  },
  cardSettingsBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 20
  },
  cardSettingsBtnLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    gap: 8
  },
  logoutBtn: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#FF3D3D',
    borderRadius: 12,
    gap:8,
  },
  logoutText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#fff',
    marginVertical: 8,
    marginLeft: 3
  },
  loginText: {
    fontWeight: 'bold',
    marginLeft: 3
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
  errorText: {
    color: "#FF3D3D"
  },
  modalInput: {
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