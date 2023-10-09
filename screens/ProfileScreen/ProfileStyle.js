import { StyleSheet } from "react-native"; 

export const ProfileStyle = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
  },
  goBack: {
    margin: 20
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#191919"
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

  containerCenter: {
    display: 'flex',
    padding: 20,
    alignItems: 'center',
  },
  cardContainer:{
    padding:20,
  },

  pic: {
    padding:20,
    marginTop:3,
    borderRadius: 8,
  },

  card: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'gray',
    backgroundColor: '#fafafa',
    display:'flex',
    flexDirection:'column',
    margin:'auto',
    marginTop:20,
    paddingTop:10,
    justifyContent:'space-between',
    backgroundColor: 'white',
  },
  row: {
    display:'flex',
    flexDirection:'row',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent:'space-evenly',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'gray',
    backgroundColor: '#fafafa',
    padding:10,
  },
  scrollView: {
  },
});
