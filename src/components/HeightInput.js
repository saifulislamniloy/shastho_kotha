import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const HeightInput = (props)=>{
    const [heightCm, setHeightCm] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');

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
    
      const renderHeightInput=(heightUnit)=>{
        if(heightUnit=='cm'){
            return (
                <View>
                    <TextInput
                        mode="outlined"
                        label="centimeter"
                        value={heightCm}
                        onChangeText={(heightCm) => {   
                            var input = heightCm.replace(/[^0-9]/g, '');
                            setHeightCm(input);
                            if(input!='')
                                props.setHeightValue(parseInt(input)/100);
                            else
                                props.setHeightValue(0);
                        }}
                    />
                </View>
            );
        }
        else{
            return (
                <View style={{ flexDirection:"row", justifyContent:"space-between" }}>
                    <TextInput
                        style={{ width:dimensions.window.width/2.4 }}
                        mode="outlined"
                        label="feet"
                        value={heightFeet}
                        onChangeText={ (heightFeet) => {
                            var input = heightFeet.replace(/[^0-9]/g, '');
                            setHeightFeet(input);

                            var res = 0; 
                            if(heightInches!='')
                                res += parseInt(heightInches)/39.37;
                            if(heightFeet!='')
                                res += parseInt(heightFeet)/3.281;
                            props.setHeightValue(res.toPrecision(4));
                        }}
                    />
                    <TextInput
                        style={{ width:dimensions.window.width/2.4 }}
                        mode="outlined"
                        label="inches"
                        value={heightInches}
                        onChangeText={(heightInches) => {
                            var input = heightInches.replace(/[^0-9]/g, '');
                            setHeightInches(input);
                            
                            var res = 0; 
                            if(heightInches!='')
                                res += parseInt(heightInches)/39.37;
                            if(heightFeet!='')
                                res += parseInt(heightFeet)/3.281;
                            props.setHeightValue(res.toPrecision(4));
                        }}
                    />
                </View>
            ); 
        }
    }

    return(
        <View>
            <View 
                style={{
                    flexDirection:'row', 
                    justifyContent:"space-between",
                    paddingBottom:2 
                }}
            >
                <Text style={{fontWeight:'bold'}}>Height </Text>
           
                <TouchableOpacity
                    onPress={()=>{
                        props.setHeightValue(0);
                        setHeightCm('');
                        setHeightInches('');
                        setHeightFeet('');
                        if(heightUnit=='cm')
                            setHeightUnit('feet');
                        else
                            setHeightUnit('cm');
                    }}
                >
                    <Text style={{fontWeight:'bold', color:'blue'}}>switch unit</Text>
                </TouchableOpacity>
            </View>
            {renderHeightInput(heightUnit)}
        </View>
    );
}

export default HeightInput;