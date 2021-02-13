import { Body, Card, CardItem, Container, Content, Text } from 'native-base';
import React from 'react';
import { Dimensions, View } from "react-native";
import { ProgressChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFFFF",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};


const NutritionResultScreen = (props) => {
  let nutrition = props.route.params;
  let carbohydratesCalories = (parseInt(nutrition.Carbohydrate) / 1000) * 4;
  let proteinCalories = (parseInt(nutrition.Protein) / 1000) * 4;
  let fatCalories = (parseInt(nutrition.Fat) / 1000) * 9;
  let totalCalorie = carbohydratesCalories + proteinCalories + fatCalories
  let carbatio = carbohydratesCalories / totalCalorie;
  let proteinRatio = proteinCalories / totalCalorie;
  let fatRatio = fatCalories / totalCalorie;
    const data = {
      labels: ["Carb", "Protein", "Fat"], // optional
      data: [carbatio, proteinRatio, fatRatio]
    };
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
        <View style={{border:'1px solid red', margin:1}}>
          <ProgressChart
            data={data}
            width={screenWidth-5}
            height={220}
            strokeWidth={12}
            radius={20}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
      </Content>
    </Container>
  );
};

export default NutritionResultScreen;
