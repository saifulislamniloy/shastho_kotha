import { Body, Card, CardItem, Container, Content, Text } from 'native-base';
import React from 'react';
import { Button, Linking } from 'react-native';

const FoodDetail = (props) => {
  let food = props.route.params;
  console.log(food);
  let carbohydratesCalories = (parseInt(food.Carbohydrate) / 1000) * 4;
  let proteinCalories = (parseInt(food.Protein) / 1000) * 4;
  let fatCalories = (parseInt(food.Fat) / 1000) * 9;
  let totalCalorie = carbohydratesCalories + proteinCalories + fatCalories;
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text style={{ alignSelf: 'center' }}>{food.TitleBangla} </Text>
              <Text style={{ alignSelf: 'center' }}>{food.TitleEnglish} </Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text>Carbohydrate: {food.Carbohydrate} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Protein: {food.Protein} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Fat: {food.Fat} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Sugar: {food.Sugar} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Dietary Fiber: {food.DietaryFiber} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Calcium: {food.Calcium} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Iron: {food.Iron} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Magnesium: {food.Magnesium} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Phosphorus: {food.Phosphorus} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Potassium: {food.Potassium} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Sodium: {food.Sodium} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Zinc: {food.Zinc} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Vitamin A: {food.VitaminA} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Vitamin B6: {food.VitaminB6} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Vitamin C: {food.VitaminC} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Vitamin D: {food.VitaminD} mg</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Text style={{ alignSelf: 'center' }}>Total: {totalCalorie.toFixed(2)} calorie per 100 gm</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem style={{ alignSelf: 'center' }}>
            <Button
              title='Reference'
              onPress={() => {
                Linking.openURL(food.SiteLink);
              }}
            />
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default FoodDetail;
