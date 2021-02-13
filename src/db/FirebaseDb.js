import firebase from './../config/Firebase';

function getFoods() {
  return firebase.database().ref('Foods/').once('value');
}

function getSingleFood() {}

function getFoodsArray(data) {
  let foods = [];
  let keys = getKeys(data);
  let count = getCount(data);
  for (let i = 0; i < count; i++) {
    foods.push(data[keys[i]]);
  }
  return foods;
}

function getCount(data) {
  let count = 0;
  for (let key in data) {
    count += 1;
  }
  return count;
}

function getKeys(data) {
  let keys = [];
  for (let key in data) {
    keys.push(key);
  }
  return keys;
}

export { getFoods, getSingleFood, getFoodsArray };
