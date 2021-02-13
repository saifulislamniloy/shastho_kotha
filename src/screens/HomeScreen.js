import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const HomeScreen = (props) => {
  return (
    <View>
      <View style={styles.layout}>
        <View style={styles.button}>
          <Button
            title='BMI'
            onPress={function () {
              props.navigation.navigate('BmiScreen');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Body Fat'
            onPress={function () {
              props.navigation.navigate('BodyFatScreen');
            }}
          />
        </View>
      </View>
      <View style={styles.layout}>
        <View style={styles.button}>
          <Button
            title='Food Nutrition'
            onPress={function () {
              props.navigation.navigate('FoodNutritionScreen');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Water Notification'
            onPress={function () {
              props.navigation.navigate('WaterNotificationScreen');
            }}
          />
        </View>
      </View>
      <View style={styles.layout}>
        <View style={styles.button}>
          <Button
            title='Exercise Helper'
            onPress={function () {
              props.navigation.navigate('ExerciseHelperScreen');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Meal Planner'
            onPress={function () {
              props.navigation.navigate('MealPlannerScreen');
            }}
          />
        </View>
      </View>
      <View style={styles.layout}>
        <View style={styles.button}>
          <Button
            title='Goal Set & Check'
            onPress={function () {
              props.navigation.navigate('GoalSetCheckScreen');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center'
  },
  button: {
    margin: 10,
    padding: 10
  }
});

export default HomeScreen;
