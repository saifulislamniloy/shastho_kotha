import React,{useEffect,useState} from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Portal, Text, Button, Dialog, RadioButton, TextInput } from 'react-native-paper';

const ActivityInputDialog=(props)=>{
    const [activityLevel, setActivityLevel] = useState('Little or no exercise');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
    const [dimensions, setDimensions] = useState({ window, screen });
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
      };
    
    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
          Dimensions.removeEventListener("change", onChange);
        };
    });

        return (
            <View>
                <Text style={{fontWeight:'bold', paddingTop:12}}>Activity Level</Text>
                <TouchableOpacity onPress={showDialog}>
                    <TextInput
                        mode="outlined"
                        value={activityLevel}
                        editable={false}
                    >
                    </TextInput>
                </TouchableOpacity>
                
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Choose an option</Dialog.Title>
                        
                        <Dialog.Content style={{ width:dimensions.window.width/1.3 }}>
                            <View>
                            <View  style={{flexDirection:'row', alignItems:"center"}}>
                                <RadioButton
                                    value="Little or no exercise"
                                    status={ activityLevel === "Little or no exercise"? 'checked' : 'unchecked' }
                                    onPress={() => {
                                        setActivityLevel("Little or no exercise"); 
                                        props.setActivityValue(1.2);
                                    }}
                                />
                                <Text>Little or no exercise</Text>
                            </View>
                            <View  style={{flexDirection:'row', alignItems:"center"}}>
                                <RadioButton
                                    value="Light: 1-3 times exercise/week"
                                    status={ activityLevel === "Light" ? 'checked' : 'unchecked' }
                                    onPress={() => {setActivityLevel("Light"); props.setActivityValue(1.37);}}
                                />
                                <Text>Light: 1-3 times exercise/week</Text>
                            </View>
                            <View  style={{flexDirection:'row', alignItems:"center",paddingBottom:3}}>
                                <RadioButton
                                    value="Moderate: 4-5 times exercise/week"
                                    status={ activityLevel === "Moderate" ? 'checked' : 'unchecked' }
                                    onPress={() => {setActivityLevel("Moderate"); props.setActivityValue(1.46);}}
                                />
                                <Text>Moderate: 4-5 times exercise/week</Text>
                            </View>
                            <View  style={{flexDirection:'row', alignItems:"center",paddingBottom:5}}>
                                <RadioButton
                                    value="Active: daily exercise or intense 3-4 times exercise/week"
                                    status={ activityLevel === "Active" ? 'checked' : 'unchecked' }
                                    onPress={() => {setActivityLevel("Active"); props.setActivityValue(1.54);}}
                                />
                                <Text>Active: daily exercise or intense 3-4 times exercise/week</Text>
                            </View>
                            <View  style={{flexDirection:'row', alignItems:"center",paddingBottom:5}}>
                                <RadioButton
                                    value="Very active: intense 6-7 times exercise/week"
                                    status={ activityLevel === "Very active" ? 'checked' : 'unchecked' }
                                    onPress={() => {setActivityLevel("Very active");  props.setActivityValue(1.72);}}
                                />
                                <Text>Very active: intense 6-7 times exercise/week</Text>
                            </View>
                            </View>

                        </Dialog.Content>

                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <Button onPress={hideDialog}>OK</Button>
                        </Dialog.Actions>

                    </Dialog>
                </Portal>
          </View>
        );
}

export default ActivityInputDialog;