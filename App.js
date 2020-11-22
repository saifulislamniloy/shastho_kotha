import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from './src/screens/HomeScreen';


const HomeStack = createStackNavigator();

function App() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: "Home Page" }}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default App;