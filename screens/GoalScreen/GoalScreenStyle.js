import { StyleSheet,Dimensions } from "react-native";

export const GoalScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  goalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 24,
  },
  description: {
    marginTop:12,
    fontSize: 18,
    marginBottom: 16,
  },
  progressBar: {
    width: Dimensions.get('window').width * 0.9,
    marginTop:8,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});