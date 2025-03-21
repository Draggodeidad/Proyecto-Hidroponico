import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#235025",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  notificationIcon: {
    padding: 8,
  },
  signInContainer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    gap: 15,
  },
  signInText: {
    fontSize: 18,
    color: "#235025",
    fontWeight: "500",
  },
  userProfileContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#235025",
  },
  userEmailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#235025",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    gap: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 25,
    paddingHorizontal: 16,
  },
  menuItemWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuIconContainer: {
    width: 40,
    alignItems: "center",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#235025",
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  versionContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  versionText: {
    color: "#666",
    fontSize: 14,
  },
});

export default styles;
