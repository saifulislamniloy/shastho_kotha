import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import BmiScreen from './src/screens/BmiScreen';
import BodyFatScreen from './src/screens/BodyFatScreen';
import ExerciseHelperScreen from './src/screens/ExerciseHelperScreen';
import FoodNutritionScreen from './src/screens/FoodNutritionScreen';
import GoalSetCheckScreen from './src/screens/GoalSetCheckScreen';
import MealPlannerScreen from './src/screens/MealPlannerScreen';
import WaterNotificationScreen from './src/screens/WaterNotificationScreen';


const HomeStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="HomeScreen">
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="BmiScreen" component={BmiScreen} />
        <HomeStack.Screen name="BodyFatScreen" component={BodyFatScreen} />
        <HomeStack.Screen name="ExerciseHelperScreen" component={ExerciseHelperScreen} />
        <HomeStack.Screen name="FoodNutritionScreen" component={FoodNutritionScreen} />
        <HomeStack.Screen name="GoalSetCheckScreen" component={GoalSetCheckScreen} />
        <HomeStack.Screen name="MealPlannerScreen" component={MealPlannerScreen} />
        <HomeStack.Screen name="WaterNotificationScreen" component={WaterNotificationScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;