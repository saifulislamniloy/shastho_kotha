import { AntDesign } from '@expo/vector-icons';
import { Button, Container, Content, Form, List, Picker, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { getExerciseForCalorieCounter } from '../db/FileDbFunctions';

export default class GoalSetCheckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      exercises: [],
      selectedExercises: [],
      loading: true
    };
  }

  styles = StyleSheet.create({
    calculateButton: {
      display: 'flex',
      alignSelf: 'center'
    },
    foodImage: {
      height: 200,
      width: 200
    },
    emptyFoodView: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    selectedFoodContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: 5,
      margin: 5,
      borderWidth: 1,
      borderRadius: 5
    },
    topView: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    bottomView: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    title: {
      flex: 3
    },
    remove: {
      flex: 1,
      justifyContent: 'center'
    },
    plus: {
      flex: 1,
      justifyContent: 'center'
    },
    minus: {
      flex: 1,
      justifyContent: 'center'
    },
    amount: {
      flex: 1,
      textAlign: 'center'
    }
  });

  componentDidMount() {
    this.setState({ exercises: getExerciseForCalorieCounter(), loading: false });
  }

  onValueChange(value) {
    this.setState({ selected: value });
    this.addFood(value);
  }

  addFood(i) {
    let selectedExercises = this.state.selectedExercises;
    let exercise = this.state.exercises[i];
    selectedExercises.push(exercise);
    console.log(exercise);
    this.setState({ selectedExercises: selectedExercises });
  }

  removeExercise(index) {
    let selectedExercises = this.state.selectedExercises;
    let mergedExercises = [];
    selectedExercises.map((value, i) => {
      if (i !== index) mergedExercises.push(value);
    });
    this.setState({ selectedExercises: mergedExercises });
  }

  increaseAmount(index) {
    let selectedExercises = this.state.selectedExercises;
    selectedExercises[index].Duration += 1;
    this.setState({ selectedExercises: selectedExercises });
  }

  decreaseAmount(index) {
    let selectedExercises = this.state.selectedExercises;
    selectedExercises[index].Duration -= 1;
    this.setState({ selectedExercises: selectedExercises });
  }

  calculateCalorie() {
    let calorie = 0;
    let selectedExercises = this.state.selectedExercises;
    selectedExercises.map((exercise) => {
      calorie += +exercise.Duration * parseInt(exercise.CaloriePerMinute);
    });
    console.log(calorie);
    return { calorie };
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <Container>
        <Content>
          <Form>
            <Picker
              note
              mode='dropdown'
              style={{ width: null }}
              placeholder='Select Food'
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor='#007aff'
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}>
              {this.state.exercises.map((exercise, index) => {
                return <Picker.Item key={index} label={exercise.TitleBangla} value={index} />;
              })}
            </Picker>
          </Form>
          <List>
            {this.state.selectedExercises.length === 0 && (
              <View style={this.styles.emptyFoodView}>
                <Image source={require('./../../assets/images/app-images/exercise.png')} style={this.styles.foodImage} />
              </View>
            )}
            {this.state.selectedExercises.length > 0 &&
              this.state.selectedExercises.map((exercise, index) => {
                return (
                  <View key={index} style={this.styles.selectedFoodContainer}>
                    <View style={this.styles.topView}>
                      <Text style={this.styles.title}>{exercise.TitleBangla}</Text>
                      <Button bordered danger onPress={() => this.removeExercise(index)} style={this.styles.remove}>
                        <AntDesign name='delete' size={24} color='red' />
                      </Button>
                    </View>
                    <View style={this.styles.bottomView}>
                      <Button bordered onPress={() => this.decreaseAmount(index)} style={this.styles.minus}>
                        <AntDesign name='minuscircleo' size={24} color='black' />
                      </Button>
                      <Text style={this.styles.amount}>{`${exercise.Duration} মিনিট`}</Text>
                      <Button bordered onPress={() => this.increaseAmount(index)} style={this.styles.plus}>
                        <AntDesign name='pluscircleo' size={24} color='black' />
                      </Button>
                    </View>
                  </View>
                );
              })}
            <View style={this.styles.calculateButton}>
              <Button
                rounded
                onPress={() => {
                  this.props.navigation.navigate('CalorieBurnResultScreen', this.calculateCalorie());
                }}>
                <Text>Calculate Calroie</Text>
              </Button>
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}
