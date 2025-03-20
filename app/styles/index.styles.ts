import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#235025",
  },
  monitoreo: {
    backgroundColor: "#235025",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  titulo: {
    color: "#fafafa",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "semibold",
    //opacity: 0.5,
  },
  data: {
    width: "100%",
  },
  itemcont: {},
  textmoni: {
    color: "#fafafa",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  shortInput: {
    width: 68,
    height: 40,
    marginRight: 5,
  },
  timePickerContainer: {
    flexDirection: "row",
    marginLeft: 90,
    alignItems: "center",
  },
  picker: {
    width: 100,
    backgroundColor: "transparent",
  },
  datos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  circleContainer: {
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#000",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  dato: {
    color: "#fafafa",
    fontSize: 14,
    textAlign: "center",
  },
  circletext: {
    color: "#fafafa",
    fontSize: 16,
    marginTop: 10,
  },
  help: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#093710",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#235025",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 5,
  },
});

export default styles;
