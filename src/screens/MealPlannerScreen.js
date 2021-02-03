import { AntDesign } from '@expo/vector-icons';
import { Button, Container, Content, Form, List, Picker, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default class MealPlannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Select Food',
      foods: [
        { title: 'mango', amount: 100 },
        { title: 'rice', amount: 100 }
      ],
      selectedFoods: []
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
      alignItems: 'center',
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

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
    this.addFood(this.state.selected);
  }

  addFood(food) {
    let selectedFoods = this.state.selectedFoods;
    selectedFoods.push({ title: food, amount: 100 });
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

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Picker
              note
              mode='dropdown'
              style={{ width: null }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}>
              {this.state.foods.map((food, index) => {
                return <Picker.Item label={food.title} value={`key${index}`} />;
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
                      <Text style={this.styles.title}>{food.title}</Text>
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
              <Button rounded onPress={() => this.addFood('h')}>
                <Text>Calculate Nutrition</Text>
              </Button>
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}
