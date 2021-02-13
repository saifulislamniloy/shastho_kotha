import React,{ useState, useEffect } from 'react';
import {View, Text, ScrollView, Button, FlatList, Card} from 'react-native';
import {getDataJSON,storeDataJSON, getAllElements} from "../functions/AsyncStorageFunctions";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const WaterNotificationScreen =()=>{
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alarms, setAlarms] = useState([]);
    const [alarmID, setAlarmID] = useState(0);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (time) => {
        console.warn("A time has been picked: ", time);
        //
        await setAlarmID(["alarm" + time]);
        let newAlarm = {
            time: time,
            alarmID: alarmID,
        };
        storeDataJSON(
            JSON.stringify(alarmID),
            JSON.stringify(newAlarm)
        );          
        //alert("Alarm Saved!")
        
        hideDatePicker();
        await loadAlarms();
    };

    const loadAlarms = async () => {
        setLoading(true);
        let response = await getAllElements('alarm');
        if (response != null) {
          setAlarms(response);
        }
        setLoading(false);
    };
    ///////////////////
    const renderWaterNotifier=(number)=>{
        return (
            <View>
                <Card>
                    <View style={{flexDirection:'row', alignItems:'center'}}>   
                        <TextInput
                            //style={{ width:dimensions.window.width/2.4 }}
                            label="hours"
                            mode="outlined"
                            value={age}
                            onChangeText={(age) => {   
                                var input = age.replace(/[^0-9]/g, '');
                                setAge(input);
                            }}
                        />
                        <TextInput
                            //style={{ width:dimensions.window.width/2.4 }}
                            label="minitues"
                            mode="outlined"
                            value={age}
                            onChangeText={(age) => {   
                                var input = age.replace(/[^0-9]/g, '');
                                setAge(input);
                            }}
                        />
    
                    </View>
                </Card>
            </View>
        );
    }
    ///////////////////
    useEffect(() => {
        loadAlarms();
      }, []);
    /////////////////

    return (
        <View>
            <Text> Set time to remind you for drinking water</Text>
            <View>
                <Button title="Set reminder time" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                    <FlatList
                        data={alarms}
                        onRefresh={loadAlarms}
                        
                        refreshing={loading}
                        renderItem={function ({ item }) {
                            let data = JSON.parse(item);
                            console.log(JSON.stringify(data));
                            return (
                                <View>
                                    <Card>
                                        <Text>alarmID: {item.alarmID}, time: {data.time} </Text>
                                    </Card>
                                </View>
                            );
                        }}
                    />
            </View>
        </View>
    );
}

export default WaterNotificationScreen;