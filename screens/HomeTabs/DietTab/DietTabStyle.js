import { StyleSheet } from "react-native";

export const DietTabStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop:20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:5
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardGoalContainer: {
    display: 'flex',
    marginTop: 12,
    gap: 12
  },
  cardGoal: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  cardGoalLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardGoalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardGoalText: {
    flex: 1,
  },
  cardGoalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noGoalsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});