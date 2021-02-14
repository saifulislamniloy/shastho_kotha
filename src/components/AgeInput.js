import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, Divider, HelperText } from 'react-native-paper';

const AgeInput=(props)=>{
    const [age, setAge] = useState('');

    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
    const [dimensions, setDimensions] = useState({ window, screen });
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
      };
    const inputHasErrors = (lower_limit, upper_limit, input) => {
        return (input<lower_limit || input>upper_limit);
    };
    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
          Dimensions.removeEventListener("change", onChange);
        };
      });

    const renderAgeInput=()=>{
        if(true){
            return(
                <View>
                    <Divider/>
                    <Text style={{fontWeight:'bold', paddingTop:12}}>Age </Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>   
                        <TextInput
                            style={{ width:dimensions.window.width/2.4 }}
                            label="age: 2 - 120"
                            mode="outlined"
                            value={age}
                            onChangeText={(age) => {   
                                var input = age.replace(/[^0-9]/g, '');
                                setAge(input);
                                if(input!=''){
                                    props.setAgeValue(parseInt(age));
                                }else{
                                    props.setAgeValue(0);
                                }
                            }}
                        />
                        <HelperText type="error" visible={inputHasErrors(2, 120, parseInt(age))}>
                            invalid age !!
                        </HelperText>
                    </View>
                </View>
            );
        }
    }

    return(
        <View>
            {renderAgeInput()}
        </View>
    );
}

export default AgeInput;