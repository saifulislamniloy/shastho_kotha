import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


const HomeStack = createStackNavigator();

function App() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
    </HomeStack.Navigator>
  );
}

export default App;