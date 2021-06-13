import React from 'react'
import { View, Text,  StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

class UserProfileScreen extends React.Component {
    render() {
        return(
            <View style = {styles.screen}>
                <Text>This is A UserProfile SCREEN </Text>
            </View>
        )
    }
}

export default UserProfileScreen