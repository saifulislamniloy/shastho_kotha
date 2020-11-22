import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';


const HomeStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="HomeScreen">
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;