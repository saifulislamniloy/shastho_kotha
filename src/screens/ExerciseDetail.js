import { Body, Card, CardItem, Container, Content, Text } from 'native-base';
import React from 'react';
import { Button, Image, Linking, StyleSheet } from 'react-native';

const ExerciseDetail = (props) => {
  let exercise = props.route.params;
  console.log(exercise);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem cardBody>
            <Image source={{ uri: exercise.picture }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ alignSelf: 'center' }}>{exercise.name}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <Text style={styles.header}>অঙ্গ /পেশি</Text>
          <CardItem>
            <Body>
              <Text>{exercise.organ}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <Text style={styles.header}>নিয়ম </Text>
          {exercise.rules.map((rule, index) => {
            return (
              <CardItem>
                <Body>
                  <Text>◙ {rule}</Text>
                </Body>
              </CardItem>
            );
          })}
        </Card>
        <Card>
          <Text style={styles.header}>উপকারিতা </Text>
          {exercise.benefits.map((benefit, index) => {
            return (
              <CardItem>
                <Body>
                  <Text>◙ {benefit}</Text>
                </Body>
              </CardItem>
            );
          })}
        </Card>
        <Card>
          <Text style={styles.header}>সাধারণ ভুলগুলি </Text>
          {exercise.commonMistakes.map((mistake, index) => {
            return (
              <CardItem>
                <Body>
                  <Text>◙ {mistake}</Text>
                </Body>
              </CardItem>
            );
          })}
        </Card>
        <Card>
          <CardItem style={{ alignSelf: 'center' }}>
            <Button
              title='Reference'
              onPress={() => {
                Linking.openURL(exercise.siteLink);
              }}
            />
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25
  }
});
export default ExerciseDetail;
