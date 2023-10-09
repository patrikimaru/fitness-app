import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({ 
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom:80
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notification: {
    fontSize: 30,
    fontWeight: '100'
  },
  userProfile: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginVertical: 20,
    backgroundColor: '#191919',
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  subTitle:{
    fontSize: 22,
    fontWeight: '600',
  },
  greetings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  email: {
    fontWeight: '600'
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