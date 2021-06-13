import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    formControl : {
        width : '100%'
    },
    label : {
    
        marginVertical : 8
    },
    input : {
        paddingHorizontal : 2,
        paddingVertical : 5,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1
    }

})


const CustomInput = (props) => {
    return(
        <View style = {styles.formControl}>
            <Text style = {styles.label}>{props.label}</Text>
            <TextInput {...props} onChangeText = {(text) => {props.textChangeHandler(text)}}  value = {props.value}  style = {styles.input} />
        </View>
    )
    
}

export default CustomInput