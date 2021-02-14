import React,{ useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { RadioButton, Button } from 'react-native-paper';

import HeightInput from '../components/HeightInput';
import WeightInput from '../components/WeightInput';
import AgeInput from '../components/AgeInput';
import ActivityInputDialog from '../components/ActivityInputDialog';
import {BMICategory, bodyFatCategory ,DailyWaterNeed, calculateBMR} from '../functions/HealthCalculatorFunctions';

const BmiScreen =()=>{
    const input = React.createRef();
    const [gender, setGender] = useState(0);    
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [activityFactor, setActivityFactor] = useState(1.2);

    const[BMI, setBMI] = useState('');
    const[bodyFat, setBodyFat] = useState('');
    const[isRenderResult, setIsRenderResult] = useState(false);

    const renderResult=()=>{
        if(isRenderResult){
            let bmi_info = BMICategory(BMI, age);
            let body_Fat = bodyFatCategory(bodyFat, gender);
            var water_need_ounces = DailyWaterNeed(age, weight).toPrecision(4);
            var water_need_liter = (water_need_ounces/33.81).toPrecision(3);
            var BMR = calculateBMR(weight, height, age, gender);
            var calory_need = (BMR * activityFactor).toPrecision(4); 
            return(
                <View>
                    <Card>
                        <Card.Title style={{fontSize:16, backgroundColor:"#756d7a", color:"white", padding:4}}>
                            BMI result</Card.Title> 
                        <Text style={{fontSize:16, fontWeight:'bold', color:bmi_info.color}}>
                            BMI: {BMI.toPrecision(3)} {`\n`}{ bmi_info.msg }
                        </Text>
                        <Text  style={{color:'black', fontSize:15}}> 
                            {`\nHealthy BMI range: 18.5 - 25`}
                        </Text>
                    </Card>
                    <Card>
                        <Card.Title style={{fontSize:16, backgroundColor:"#756d7a", color:"white", padding:4}}>
                            Body fat percentage result</Card.Title> 
                        <Text style={{fontSize:16, fontWeight:'bold', color:body_Fat.color}}>
                            Estimated body-fat percentage: {bodyFat.toPrecision(3)}% {`\n`}{ body_Fat.msg }
                        </Text>
                        <Text  style={{color:'black', fontSize:15}}> 
                            {`\nHealthy percentage range:\n(14 - 17)% for male\n(21 - 24)% for female\n\n`}
                            This category classification based on specified categories given by American Council on Exercise(ACE)
                            and this percentage shows here is just an estimation based on BMI, age and gender.   
                        </Text>
                    </Card>
                    <Card>
                        <Card.Title style={{fontSize:16, backgroundColor:"#756d7a", color:"white", padding:4}}>
                            BMR result</Card.Title> 
                        <Text style={{fontSize:16, fontWeight:'bold'}}>
                            Basal Metabolic Rate (BMR): {BMR} {`\n`}
                        </Text>
                        <Text  style={{color:'black', fontSize:15}}> 
                            BMR indicates the amount of energy expended per day at rest.{`\n`}
                            This calculation based on Mifflin-St Jeor Equation which gives almost accurate results.
                        </Text>
                    </Card>
                    <Card>
                        <Card.Title style={{fontSize:16, backgroundColor:"#756d7a", color:"white", padding:4}}>
                            Calorie required per day</Card.Title> 
                        <Text style={{fontSize:16, fontWeight:'bold'}}>
                            To maintain weight: {calory_need} calories 
                        </Text>
                        <Text  style={{color:'black', fontSize:15}}> 
                            {`\n`}To lose weight(0.5 lb/week): {(calory_need*0.9).toPrecision(4)} calories
                            {`\n`}To lose weight(1 lb/week): {(calory_need*0.8).toPrecision(4)} calories
                            {`\n`}To gain weight(0.5 lb/week): {(calory_need*1.1).toPrecision(4)} calories
                            {`\n`}To gain weight(1 lb/week): {(calory_need*1.2).toPrecision(4)} calories
                        </Text>
                    </Card>
                    <Card>
                        <Card.Title style={{fontSize:16, backgroundColor:"#756d7a", color:"white", padding:4}}>
                            Required Water per day</Card.Title> 
                        <Text  style={{color:'black', fontSize:15}}> 
                            Daily {water_need_liter} liter or {water_need_ounces} ounce water required based on your weight and age.
                            {`\n\n`}Use our water reminder feature to get drink water notification.
                        </Text>
                    </Card>
                </View>
            );
        }
        else {
            return (<View></View>);
        }
    }

    const generateResults=()=>{
        if(weight<2 ){
            alert("Weight is too low. Weight should be minimum 2kg");
            setIsRenderResult(false);
        }
        else if(height<0.3048){
            alert("Height is too low. Minimum height required 12inches or 300cm");
            setIsRenderResult(false);
        }
        else if(age<2 || age>120){
            alert("Invalid age !!");
            setIsRenderResult(false);
        }
        else{
            //alert(age);
            var bmi=weight/(height**2);
            setBMI(bmi);
            if(age<=15 && age>=2)
                setBodyFat((1.51*bmi) - (0.70*age) - (3.6*gender) + 1.4 );
            else if(age>15 && age<=120){
                setBodyFat((1.39*bmi) + (0.16*age) - (10.34*gender)- 9 );
                //alert(gender);
            }
            setIsRenderResult(true);
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

                <View style={{paddingBottom:15}}>
                    <HeightInput
                        setHeightValue={setHeight}
                    />
                </View>

            <Card.Divider/>

                <View style={{paddingBottom:15}}>
                    <WeightInput
                        setWeightValue={setWeight}
                    />
                </View>
                
                <View style={{paddingBottom:15}}>
                    <ActivityInputDialog
                        setActivityValue={setActivityFactor}
                    />
                </View>

                <View style={{paddingBottom:15}}>
                    <AgeInput
                        setAgeValue={setAge}
                    />
                </View>
                
                <Button 
                    //icon="calulate" 
                    mode="contained" 
                    onPress={generateResults}
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