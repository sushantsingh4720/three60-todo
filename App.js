import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Auth/login/Login";
import { Provider as PaperProvider } from "react-native-paper";
import SignUp from "./src/screens/Auth/signup/SignUp";
import { theme } from "./src/constants/theme";
import Profile from "./src/screens/profile/Profile";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigations/AppStack";
import { AppProvider } from "./src/context/AppContext";
export default function App() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <View style={styles.container}>
            <AppStack />
          </View>
          <StatusBar style="light" />
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
