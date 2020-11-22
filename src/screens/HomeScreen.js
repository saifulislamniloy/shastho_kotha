import React from "react";
import { View, Button, StyleSheet } from "react-native";

const HomeScreen = () => {
    return (
        <View>
            <View style={styles.layout}>
                <View style={styles.button}>
                    <Button title="BMI" />
                </View>
                <View style={styles.button}>
                    <Button title="Body Fat" />
                </View>
            </View>
            <View style={styles.layout}>
                <View style={styles.button}>
                    <Button title="Food Nutrition" />
                </View>
                <View style={styles.button}>
                    <Button title="Water Notification" />
                </View>
            </View>
            <View style={styles.layout}>
                <View style={styles.button}>
                    <Button title="Exercise Helper" />
                </View>
                <View style={styles.button}>
                    <Button title="Meal Planner" />
                </View>
            </View>
            <View style={styles.layout}>
                <View style={styles.button}>
                    <Button title="Goal Set & Check" />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    layout:{ 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "center" 
    },
    button: {
        flex: 0.5,
        margin: 10,
        padding: 10
    }
})

export default HomeScreen;