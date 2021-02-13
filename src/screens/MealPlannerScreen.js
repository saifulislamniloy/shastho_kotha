import { AntDesign } from '@expo/vector-icons';
import { Button, Container, Content, Form, List, Picker, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { getFoods, getFoodsArray } from '../db/FirebaseDb';

export default class MealPlannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      foods: [],
      selectedFoods: [],
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
    console.log(this.props.navigation.navigate);
    getFoods().then((snapshot) => {
      const foods = snapshot.val();
      const foodArray = getFoodsArray(foods);
      this.setState({ foods: foodArray, loading: false });
      // console.log(foodArray);
    });
  }

  onValueChange(value) {
    this.setState({ selected: value });
    this.addFood(value);
  }

  addFood(i) {
    let selectedFoods = this.state.selectedFoods;
    let food = this.state.foods[i];
    food.amount = 100;
    selectedFoods.push(food);
    console.log(food);
    this.setState({ selectedFoods: selectedFoods });
  }

  removeFood(index) {
    let selectedFoods = this.state.selectedFoods;
    let mergedFoods = [];
    selectedFoods.map((value, i) => {
      if (i !== index) mergedFoods.push(value);
    });
    this.setState({ selectedFoods: mergedFoods });
  }

  increaseAmount(index) {
    let selectedFoods = this.state.selectedFoods;
    selectedFoods[index].amount += 1;
    this.setState({ selectedFoods: selectedFoods });
  }

  decreaseAmount(index) {
    let selectedFoods = this.state.selectedFoods;
    selectedFoods[index].amount -= 1;
    this.setState({ selectedFoods: selectedFoods });
  }

  calculateNutrition() {
    let Carbohydrate = 0;
    let Protein = 0;
    let Fat = 0;
    let Iron = 0;
    let selectedFoods = this.state.selectedFoods;
    selectedFoods.map((food) => {
      Carbohydrate += +(parseFloat(food.Carbohydrate).toFixed(0) * food.amount) / 100;
      Protein += +(parseFloat(food.Protein).toFixed(0) * food.amount) / 100;
      Fat += +(parseFloat(food.Fat).toFixed(0) * food.amount) / 100;
      Iron += +parseFloat(food.Iron).toFixed(10);
    });
    console.log(Carbohydrate, Protein, Fat, Iron);
    return { Carbohydrate, Protein, Fat };
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
              {this.state.foods.map((food, index) => {
                return <Picker.Item key={index} label={food.TitleBangla} value={index} />;
              })}
            </Picker>
          </Form>
          <List>
            {this.state.selectedFoods.length === 0 && (
              <View style={this.styles.emptyFoodView}>
                <Image source={require('./../../assets/images/app-images/diet.png')} style={this.styles.foodImage} />
                <Text>Select Food</Text>
              </View>
            )}
            {this.state.selectedFoods.length > 0 &&
              this.state.selectedFoods.map((food, index) => {
                return (
                  <View key={index} style={this.styles.selectedFoodContainer}>
                    <View style={this.styles.topView}>
                      <Text style={this.styles.title}>{food.TitleBangla}</Text>
                      <Button bordered danger onPress={() => this.removeFood(index)} style={this.styles.remove}>
                        <AntDesign name='delete' size={24} color='red' />
                      </Button>
                    </View>
                    <View style={this.styles.bottomView}>
                      <Button bordered onPress={() => this.decreaseAmount(index)} style={this.styles.minus}>
                        <AntDesign name='minuscircleo' size={24} color='black' />
                      </Button>
                      <Text style={this.styles.amount}>{`${food.amount} gm`}</Text>
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
                  this.props.navigation.navigate('NutritionResultScreen', this.calculateNutrition());
                }}>
                <Text>Calculate Nutrition</Text>
              </Button>
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}
