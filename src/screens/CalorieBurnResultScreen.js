import { Body, Card, CardItem, Container, Content, Text } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFFFFF',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const CalorieBurnResultScreen = (props) => {
  let calorie = props.route.params;
  const data = {
    labels: ['Burned'], // optional
    data: [calorie.calorie / 1000]
  };
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>Calorie Burned: {calorie.calorie} calorie</Text>
            </Body>
          </CardItem>
        </Card>
        <ProgressChart
          data={data}
          width={screenWidth - 5}
          height={220}
          strokeWidth={12}
          radius={20}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </Content>
    </Container>
  );
};

export default CalorieBurnResultScreen;
