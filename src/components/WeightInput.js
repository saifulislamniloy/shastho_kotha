import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

const WeightInput = (props)=>{
    const [weightKg, setWeightKg] = useState('');
    const [weightStone, setWeightStone] = useState('');
    const [weightPounds, setWeightPounds] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');

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
    
    const renderWeightInput=(weightUnit)=>{
        if(weightUnit=='kg'){
            return (
                <View>
                    <TextInput
                        mode="outlined"
                        label="kilograms"
                        value={weightKg}
                        onChangeText={(weightKg) => {   
                            var input = weightKg.replace(/[^0-9]/g, '');
                            setWeightKg(input);
                            if(input!='')
                                props.setWeightValue(parseInt(input));
                            else
                                props.setWeightValue(0);
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
                        label="stone"
                        value={weightStone}
                        onChangeText={ (weightStone) => {
                            var input = weightStone.replace(/[^0-9]/g, '');
                            setWeightStone(input);
                            
                            var res = 0; 
                            if(weightStone!='')
                                res += parseInt(weightStone)*6.35;
                            if(weightPounds!='')
                                res += parseInt(weightPounds)/2.205;
                            props.setWeightValue(res.toPrecision(4));
                        }}
                    />
                    <TextInput
                        style={{ width:dimensions.window.width/2.4 }}
                        mode="outlined"
                        label="pounds"
                        value={weightPounds}
                        onChangeText={(weightPounds) => {
                            var input = weightPounds.replace(/[^0-9]/g, '');
                            setWeightPounds(input);

                            var res = 0; 
                            if(weightStone!= '')
                                res += parseInt(weightStone)*6.35;
                            if(weightPounds!= '')
                                res += parseInt(weightPounds)/2.205;
                            props.setWeightValue(res.toPrecision(4));
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
                <Text style={{fontWeight:'bold'}}>Weight </Text>
           
                <TouchableOpacity
                    onPress={()=>{
                        //alert(weight);
                        props.setWeightValue(0);
                        setWeightKg('');
                        setWeightPounds('');
                        setWeightStone('');
                        if(weightUnit=='kg')
                            setWeightUnit('pound');
                        else
                            setWeightUnit('kg');
                    }}
                >
                    <Text style={{fontWeight:'bold', color:'blue'}}>switch unit</Text>
                </TouchableOpacity>
            </View>
            
            {renderWeightInput(weightUnit)}
        
        </View>
    );
}

export default WeightInput;