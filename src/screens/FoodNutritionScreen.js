import { Body, CardItem, Container, Content, Spinner, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFoods, getFoodsArray } from './../db/FirebaseDb';

const FoodNutritionScreen = (props) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFoods().then((snapshot) => {
      const foods = snapshot.val();
      const foodArray = getFoodsArray(foods);
      setFoods(foodArray);
      setLoading(false);
      console.log(foodArray);
    });
  }, []);
  if (loading) return <Spinner />;
  return (
    <Container>
      <Content>
        {foods.map((food, index) => {
          return (
            <TouchableOpacity
              style={styles.food}
              onPress={() => {
                console.log('pressed');
                props.navigation.navigate('FoodDetail', food);
              }}>
              
            <CardItem cardBody>
              <Image source={{uri: 'https://cdn.pixabay.com/photo/2012/04/26/18/41/banana-42793_960_720.png'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.foodTitle}>{food.TitleBangla}</Text>
                </Body>
              </CardItem>
            </TouchableOpacity>
          );
        })}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  food: {
    margin: 5,
    borderWidth: 2,
    borderRadius: 1
  },
  foodTitle: {
    alignSelf: 'center'
  },
  foodKeyword: {}
});

export default FoodNutritionScreen;
