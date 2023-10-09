import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({ 
  container: {
    paddingBottom:80
  },
  mainContent: {
    padding: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop:10,
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  notification: {
    fontSize: 30,
    fontWeight: '100'
  },
  userProfile: {
    width: 35,
    height: 35,
    borderRadius: 40,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#191919"
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  subTitle:{
    fontSize: 22,
    fontWeight: '600',
  },
  greetings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
    gap: 5
  },
  email: {
    fontWeight: '600',
    color: '#fff',
  },
  cardGoalContainer: {
    marginTop: 12,
    display: 'flex',
    gap: 12
  },
  cardGoal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardGoalLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  cardGoalImage: {
    borderRadius: 12,
    width: 50,
    height: 50
  },
  cardGoalTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  cardGoalChart: {
    fontSize: 30
  }
})