import React from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    spinner : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

const Spinner = (props) => {
    return (
        <View style = {styles.spinner}>
            <ActivityIndicator size = "large" color = "blue" />
        </View>
    )
}

export default Spinner