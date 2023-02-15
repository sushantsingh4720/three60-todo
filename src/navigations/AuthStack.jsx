import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/login/Login";
import SignUp from "../screens/Auth/signup/SignUp";
const Stack = createStackNavigator();
import { useTheme } from "react-native-paper";

const AuthStack = () => {
  const theme = useTheme()
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor:"white",
      headerStyle:{
        backgroundColor:theme.colors.primary
      },
      headerTitleAlign:'center'
    }}
    >
       
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
