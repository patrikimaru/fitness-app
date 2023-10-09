import { StyleSheet } from "react-native";

export const AddGoalScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
  },
  createButton: {
    backgroundColor: "#191919",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#ccc", 
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});