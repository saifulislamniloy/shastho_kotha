import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing string value
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    alert("Data Stored Successfully!");
  } catch (error) {
    alert(error);
  }
};
// Storing object value
const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    alert("Data Stored Successfully!");
  } catch (error) {
    alert(error);
  }
};
// Reading string value
const getData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};
// Reading object value
const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    alert("Data Removed Successfully");
  } catch (error) {
    alert(error);
  }
};
//--------------
const getAllData = async () => {
  let data = []
  try {
    data = await AsyncStorage.getAllKeys();
    if (data != null) {
      return data;
    } else {
      alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};

const getAllElements = async (key_portion) => {
  let keys = await getAllData();
  let all_elements = [];
  try {
      if (keys != null) {
          for (let key of keys) {
              if (key.includes(key_portion)) {
                  let post = await getDataJSON(key);
                  all_elements.push(post);
              }
          }
          return all_elements;
      }
      else {
        alert("No "+ {key_portion} + " available");
      }
  } catch (error) {
      alert(error);
  }
}
export { storeData, storeDataJSON, getData, getDataJSON, removeData, getAllData, getAllElements };