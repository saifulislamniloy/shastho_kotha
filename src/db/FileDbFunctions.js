import db from './FileDb';

function getExerciseNames() {
  let exercises = [];
  for (let key in db) {
    exercises.push(db[key]);
  }
  return exercises;
}

export { getExerciseNames };
