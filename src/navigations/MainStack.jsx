import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import { useTheme } from "react-native-paper";
import HeaderRight from "../screens/home/HeaderRight";

const Stack = createStackNavigator();

const MainStack = () => {
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
      <Stack.Screen 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
        name="Todos" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;
