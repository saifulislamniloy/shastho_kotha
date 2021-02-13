import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { RadioButton, TextInput, Divider, HelperText, Button } from 'react-native-paper';

const BmiScreen =()=>{
    const input = React.createRef();
    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
    const [dimensions, setDimensions] = useState({ window, screen });
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
      };
    const [gender, setGender] = useState(0); 
    
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

    const[BMI, setBMI] = useState('');
    const[bodyFat, setBodyFat] = useState('');
    const[isRenderResult, setIsRenderResult] = useState(false);

    const inputHasErrors = (lower_limit, upper_limit, input) => {
        return (input<lower_limit || input>upper_limit);
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
                            setHeight(parseInt(input)/100);
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
                            setHeight(res.toPrecision(4));
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
                            setWeight(res.toPrecision(4));
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
                    <Text style={{fontWeight:'bold'}}>Age </Text>
                    <View style={{flexDirection:'row', alignItems:'center', paddingTop:10}}>   
                        <TextInput
                            style={{ width:dimensions.window.width/2.4 }}
                            label="age: 2 - 120"
                            mode="outlined"
                            value={age}
                            onChangeText={(age) => {   
                                var input = age.replace(/[^0-9]/g, '');
                                setAge(input);
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

    const renderResult=()=>{
        if(isRenderResult){
            return(
                <View>
                    <Card>
                        <Card.Title>BMI result</Card.Title> 
                        <Text>BMI: {BMI}</Text>
                    </Card>
                    <Card>
                        <Card.Title>Body fat percentage result</Card.Title> 
                        <Text>Body Fat: {bodyFat}%</Text>
                    </Card>
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
                            value="female"
                            status={ gender === 0 ? 'checked' : 'unchecked' }
                            onPress={() => {setGender(0); /* 0->female */ }}
                        />
                        <Text>Female</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                        <RadioButton
                            value="male"
                            status={ gender === 1 ? 'checked' : 'unchecked' }
                            onPress={() => {setGender(1); /* 1-> male */ }}
                        />
                        <Text>Male</Text>
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
                            //alert(height);
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
                            //alert(weight);
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
                
                <Button 
                    //icon="calulate" 
                    mode="contained" 
                    onPress={() => {
                        if(weight<2 ){
                            alert("Weight is too low. Weight should be minimum 2kg");
                            setIsRenderResult(false);
                        }
                        else if(height<0.3048){
                            alert("Height is too low. Minimum height required 12inches or 300cm");
                            setIsRenderResult(false);
                        }
                        else if(age<2 && age>120){
                            alert("Invalid age !!");
                            setIsRenderResult(false);
                        }
                        else{
                            var bmi=weight/(height**2);
                            setBMI(bmi);
                            if(age<=15 && age>=2)
                                setBodyFat((1.51*bmi) - (0.70*age) - (3.6*gender) + 1.4 );
                            else if(age>15 && age<=120){
                                setBodyFat((1.39*bmi) + (0.16*age) - (10.34*gender)- 9 );
                                alert(gender);
                            }
                            setIsRenderResult(true);
                        }
                            
                    }}
                >
                    Calculate
                </Button>
            </Card>

            <View style={{paddingBottom:15}}>
                {renderResult()}
            </View>
            
        </ScrollView>
    );
}

export default BmiScreen;