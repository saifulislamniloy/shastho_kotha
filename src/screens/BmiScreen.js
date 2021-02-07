import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { RadioButton, TextInput, Divider } from 'react-native-paper';

const BmiScreen =()=>{
    const input = React.createRef();
    const [checked, setChecked] = useState('male'); 
    
    const [height, setHeight] = useState(0);
    const [heightCm, setHeightCm] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');

    const [weight, setWeight] = useState(0);
    const [weightKg, setWeightKg] = useState('');
    const [weightStone, setWeightStone] = useState('');
    const [weightPounds, setWeightPounds] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');

    const [age, setAge] = useState('');

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
                            setHeight(parseInt(input)/100);
                        }}
                    />
                </View>
            );
        }
        else{
            return (
                <View>
                    <TextInput
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
                            setHeight(res.toPrecision(4));
                        }}
                    />
                    <TextInput
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
                            setHeight(res.toPrecision(4));
                        }}
                    />
                </View>
            ); 
        }
    }

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
                            setWeight(parseInt(input));
                        }}
                    />
                </View>
            );
        }
        else{
            return (
                <View>
                    <TextInput
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
                            setWeight(res.toPrecision(4));
                        }}
                    />
                    <TextInput
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
                            setWeight(res.toPrecision(4));
                        }}
                    />
                </View>
            ); 
        }
    }

    const renderAgeInput=()=>{
        if(true){
            return(
                <View>
                    <Divider/>
                    <View style={{flexDirection:'row', alignItems:'center', paddingTop:10}}>
                        <Text style={{fontWeight:'bold'}}>Age </Text>
                        <TextInput
                            mode="outlined"
                            value={age}
                            onChangeText={(age) => {   
                                var input = age.replace(/[^0-9]/g, '');
                                setAge(input);
                            }}
                        />
                    </View>
                </View>
            );
        }
    }


    return (
        <ScrollView>
            <Card>
                <Card.Title>BMI Calulator</Card.Title>        
                <Text style={{fontWeight:'bold'}}>Gender </Text>
                <View 
                    style={{
                        flexDirection:'row', 
                        justifyContent:"space-evenly", 
                        alignItems:"center",
                        paddingBottom:10
                        }}
                >
                    <View  style={{flexDirection:'row', alignItems:"center"}}>
                        <RadioButton
                            value="male"
                            status={ checked === 'male' ? 'checked' : 'unchecked' }
                            onPress={() => {setChecked('male');  }}
                        />
                        <Text>Male</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                        <RadioButton
                            value="female"
                            status={ checked === 'female' ? 'checked' : 'unchecked' }
                            onPress={() => {setChecked('female'); }}
                        />
                        <Text>Female</Text>
                    </View>
                </View>

            <Card.Divider/>
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
                            alert(height);
                            setHeight(0);
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
                <View style={{paddingBottom:15}}>
                    {renderHeightInput(heightUnit)}
                </View>

            <Card.Divider/>
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
                            alert(weight);
                            setWeight(0);
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
                <View style={{paddingBottom:15}}>
                    {renderWeightInput(weightUnit)}
                </View>

                <View style={{paddingBottom:15}}>
                    {renderAgeInput()}
                </View>
                
            </Card>
            
        </ScrollView>
    );
}

export default BmiScreen;