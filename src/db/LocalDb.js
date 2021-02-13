import * as SQLite from 'expo-sqlite';
// import { SQLite } from 'expo-sqlite'
// import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer';
import firebase from './Firebase';
const db = SQLite.openDatabase('health.db');
let foodColumn = [
  'TitleEnglish',
  'TitleBangla',
  'Keywords',
  'Fat',
  'Cholesterol',
  'Carbohydrate',
  'DietaryFiber',
  'Sugar',
  'Protein',
  'Calcium',
  'Iron',
  'Magnesium',
  'Phosphorus',
  'Potassium',
  'Sodium',
  'Zinc',
  'VitaminA',
  'VitaminB6',
  'VitaminC',
  'VitaminD',
  'SiteLink'
];
function fetchFoods() {
  firebase
    .database()
    .ref('Foods/')
    .once('value')
    .then((snapshot) => {
      const foods = snapshot.val();
      console.log(foods);
      console.log(getCount(foods));
      // console.log(getFoodsArray(foods)[0][foodColumn[0]]);
      createFoodTable();
      insertFoods(foods);

      console.log('local db');
      getFoodsFromDb(foods);
    });
}

function foodsInit() {}

function createFoodTable() {
  db.transaction((tx) => {
    tx.executeSql(`create table if not exists Foods 
    (
      ${foodColumn[0]} text,
      ${foodColumn[1]} text,
      Keywords text,
      Fat text,
      Cholesterol text,
      Carbohydrate text,
      DietaryFiber text,
      Sugar text,
      Protein text,
      Calcium text,
      Iron text,
      Magnesium text,
      Phosphorus text,
      Potassium text,
      Sodium text,
      Zinc text,
      VitaminA text,
      VitaminB6 text,
      VitaminC text,
      VitaminD text,
      SiteLink text
      );`);
  });
}

function insertFoods(data) {
  let foods = getFoodsArray(data);
  let count = getCount(data);
  let keys = getKeys(data);
  var i = 0;
  for (i = 0; i < count; i++) {
    console.log('inserting: ', foods[i][foodColumn[0]]);
    let x = foods[keys[i]];
    console.log('----------------------------');
    console.log(x);
    // const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('health.db'), 'Foods');

    // databaseLayer.bulkInsertOrReplace(x).then((response) => {
    //   console.log(response);
    // });

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Foods (
          ${foodColumn[0]},
          ${foodColumn[1]},
          ${foodColumn[2]},
          ${foodColumn[3]},
          ${foodColumn[4]},
          ${foodColumn[5]},
          ${foodColumn[6]},
          ${foodColumn[7]},
          ${foodColumn[8]},
          ${foodColumn[9]},
          ${foodColumn[10]},
          ${foodColumn[11]},
          ${foodColumn[12]},
          ${foodColumn[13]},
          ${foodColumn[14]},
          ${foodColumn[15]},
          ${foodColumn[16]},
          ${foodColumn[17]},
          ${foodColumn[18]},
          ${foodColumn[19]},
          ${foodColumn[20]}
        )
        VALUES(
          \'${foods[i][foodColumn[0]]}\',
          \'${foods[0][foodColumn[1]]}\',
          \'${foods[0][foodColumn[2]]}\',
          \'${foods[0][foodColumn[3]]}\',
          \'${foods[0][foodColumn[4]]}\',
          \'${foods[0][foodColumn[5]]}\',
          \'${foods[0][foodColumn[6]]}\',
          \'${foods[0][foodColumn[7]]}\',
          \'${foods[0][foodColumn[8]]}\',
          \'${foods[0][foodColumn[9]]}\',
          \'${foods[0][foodColumn[10]]}\',
          \'${foods[0][foodColumn[11]]}\',
          \'${foods[0][foodColumn[12]]}\',
          \'${foods[0][foodColumn[13]]}\',
          \'${foods[0][foodColumn[14]]}\',
          \'${foods[0][foodColumn[15]]}\',
          \'${foods[0][foodColumn[16]]}\',
          \'${foods[0][foodColumn[17]]}\',
          \'${foods[0][foodColumn[18]]}\',
          \'${foods[0][foodColumn[19]]}\',
          \'${foods[0][foodColumn[20]]}\'
          );`,
        (transact, resultset) => console.log('we made it', resultset),
        (transact, err) => console.log('We have encounter an Error', err)
      );
    });
  }
}

function getFoodsFromDb() {
  // const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('health.db'));
  // databaseLayer.executeSql('SELECT * from Foods;').then((response) => {
  //   console.log("respone expo orm")
  //   console.log(response);
  // });
  db.transaction((tx) => {
    // tx.executeSql(`insert into Foods (${foodColumn[0]}, ${foodColumn[1]}) values (\'englishtitle\', '\bangla\');`);
    // tx.executeSql('drop table if exists Foods',
    //   (transact,resultset) => console.log('we made it',resultset)
    //   ,(transact,err) => console.log('We have encounter an Error', err)
    // );

    tx.executeSql('select * from Foods', [], (_, { rows }) => console.log(JSON.stringify(rows)));
  });
}

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

export { fetchFoods };
