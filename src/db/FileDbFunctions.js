import db from './FileDb';

function getExerciseNames() {
  let exercises = [];
  for (let key in db) {
    exercises.push(db[key]);
  }
  return exercises;
}

function getExerciseForCalorieCounter() {
  let exercises = [];
  for (let key in db) {
    exercises.push({
      TitleEnglish: key,
      TitleBangla: db[key]['name'],
      CaloriePerMinute: db[key]['caloriePerMinute'],
      Duration: 10
    });
  }
  return exercises;
}

export { getExerciseNames, getExerciseForCalorieCounter };
