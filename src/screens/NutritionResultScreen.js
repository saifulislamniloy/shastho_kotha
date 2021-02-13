import { Body, Card, CardItem, Container, Content, Text } from 'native-base';
import React from 'react';

const NutritionResultScreen = (props) => {
  let nutrition = props.route.params;
  let totalCalorie =
    (parseInt(nutrition.Carbohydrate) / 1000) * 4 + (parseInt(nutrition.Protein) / 1000) * 4 + (parseInt(nutrition.Fat) / 1000) * 9;
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>Carbohydrate: {nutrition.Carbohydrate} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Protein: {nutrition.Protein} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Fat: {nutrition.Fat} mg</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Total Calorie: {totalCalorie.toFixed(2)}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default NutritionResultScreen;
