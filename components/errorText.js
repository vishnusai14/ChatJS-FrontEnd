import React from "react"
import { View, Text, StyleSheet } from "react-native"


const styles = StyleSheet.create({
    errorContainer : {
        marginVertical : 5
    },
    errorText : {
       
        color : 'red' ,
        fontSize : 10
    }
})
const ErrorText = (props) => {
    return (
        <View style = {styles.errorContainer}>
            <Text style = {styles.errorText}>{props.errorText}</Text>
        </View>
    )
}


export default ErrorText