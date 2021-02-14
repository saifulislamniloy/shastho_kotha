const bodyFatCategory=(fatPercentages, gender)=>{
    
    if(gender==0 || gender=='female'){
        if(fatPercentages>=0 && fatPercentages<10){
            return { msg:"Less than Essential fat category!!", color:'#c71d1a' };
        }
        else if(fatPercentages>=10 && fatPercentages<=13){
            return { msg:"Essential fat category ", color:'#e3c117' };
        }
        else if(fatPercentages>=14 && fatPercentages<=20){
            return { msg:"Athletes category ", color:'#9af216' };
        }
        else if(fatPercentages>=21 && fatPercentages<=24){
            return { msg:"Fitness category ", color:'#13d119' };
        }
        else if(fatPercentages>=25 && fatPercentages<=31){
            return { msg:"Average category ", color:'#e3c117' };
        }
        else if(fatPercentages>31){
            return { msg:"Obese category ", color:'#c71d1a' };
        }
    }

    else if(gender==1 || gender=='male'){
        if(fatPercentages>=0 && fatPercentages<3){
            return { msg:"Less than Essential fat category!!", color:'#c71d1a' };
        }
        else if(fatPercentages>=3 && fatPercentages<=5){
            return { msg:"Essential fat category ", color:'#e3c117' };
        }
        else if(fatPercentages>=6 && fatPercentages<=13){
            return { msg:"Athletes category ", color:'#9af216' };
        }
        else if(fatPercentages>=14 && fatPercentages<=17){
            return { msg:"Fitness category ", color:'#13d119' };
        }
        else if(fatPercentages>=18 && fatPercentages<=24){
            return { msg:"Average category ", color:'#e3c117' };
        }
        else if(fatPercentages>25){
            return { msg:"Obese category ", color:'#c71d1a' };
        }
    }
}

const BMICategory=(bmi, age)=>{

    if(age>=18){
        if(bmi>=0 && bmi<16){
            return { msg:"Severe Thinness category!!", color:'#c71d1a' };
        }
        else if(bmi>=16 && bmi<18.5){
            return { msg:"Thinness category ", color:'#e3c117' };
        }
        else if(bmi>=18.5 && bmi<25){
            return { msg:"Normal category ", color:'#13d119' };
        }
        else if(bmi>=25 && bmi<30){
            return { msg:"Overweight category ", color:'#f2b016' };
        }
        else if(bmi>=30 && bmi<35){
            return { msg:"Obese Class I category ", color:'#d4502f' };
        }
        else if(bmi>=35 && bmi<40){
            return { msg:"Obese Class II category ", color:'#eb3510'};
        }
        else if(bmi>=40){
            return { msg:"Obese Class III category ", color:'#ff0000' };
        }
    }

    else if(age<18){
        if(bmi>=0 && bmi<18.5){
            return { msg:"Underweight category ", color:'#d4502f' };
        }
        else if(bmi>=18.5 && bmi<25){
            return { msg:"Normal category ", color:'#13d119' };
        }
        else if(bmi>=25 && bmi<=30){
            return { msg:"Overweight category ", color:'#f2b016' };
        }
        else if(bmi>30){
            return { msg:"Obese Class category ", color:'#d4502f' };
        }
    }
}

const DailyWaterNeed=(age, weight)=>{
    let res=weight;
    if(age<30)
        res = res*40;
    else if(age>=30 && age<55)
        res = res*35;
    else if(age>=55)
        res = res*30;
    
    return (res/28.3);
}

const calculateBMR=(weight, height, age, gender)=>{
    let bmr = 0;
    if(gender==0 || gender=='female'){
        bmr = (10*weight) + (625*height) - (5*age) - 161; //Mifflin-St Jeor Equation
    }
    else if(gender==1 || gender=='male'){
        bmr = (10*weight) + (625*height) - (5*age) + 5;
    }
    return bmr;
}

export {BMICategory, bodyFatCategory,DailyWaterNeed, calculateBMR};