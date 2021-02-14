import { Body, CardItem, Container, Content, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getExerciseNames } from './../db/FileDbFunctions';
export default class ExerciseHelperScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      loading: true
    };
  }

  styles = StyleSheet.create({
    card: {
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'green',
      margin: 3
    },
    title: {
      alignSelf: 'center',
      fontSize: 25
    }
  });

  componentDidMount() {
    this.setState({ exercises: getExerciseNames(), loading: false });
  }
  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <Container>
        <Content>
          {this.state.exercises.map((exercise, index) => {
            return (
              <TouchableOpacity
                style={this.styles.card}
                onPress={() => {
                  console.log('pressed');
                  this.props.navigation.navigate('ExerciseDetail', exercise);
                }}>
                <CardItem cardBody>
                  <Image source={{ uri: exercise.picture }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style={this.styles.title}>{exercise.name}</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            );
          })}
        </Content>
      </Container>
    );
  }
}
