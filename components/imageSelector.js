import React from "react"
import { View, StyleSheet, Text, Image, Alert, Button } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Avatar } from 'react-native-paper'

const styles = StyleSheet.create({
    imagePicker : {
        alignItems : 'center'
    },
   
    
})




class ImageSelector extends React.Component  {

    state = {
        imageUri : undefined
    }

    verifyPermission = async() => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if(result.status !== 'granted') {
            Alert.alert('Insufficient Permission' , 'You Need To Give Permission to Access The Camer', [{title : 'Ok'}])
            return false
        }
        return true
    }

    imageHandler = async () => {
        const hasPermission =  await this.verifyPermission()
        if(!hasPermission) {
            return
        }
        console.log("Something Happening")
    
        try {
            ImagePicker.launchImageLibraryAsync({
                allowsEditing : true,
                aspect : [16,9],
                quality : 0.9,
                base64 : true
            })
            .then((result) => {
                console.log("The Result is " , result)
                if(result.cancelled) {
                    console.log(result)
                    return
                }
                this.props.imageTaken(result.base64)
                this.setState(prevState => ({
                    ...prevState,
                    imageUri : result.uri
                }))
               
            })
            .catch((err) => {
                console.log(err)
            })
        }catch(err) {
            console.log(err)
        }
        
    }

    render() {
        return (
            <View style = {styles.imagePicker}>
                <View >
                {   
                    !this.state.imageUri ? <Avatar.Image size = {200} source = {{uri : this.props.image}} /> :  <Avatar.Image size = {200} source = {{uri : this.state.imageUri}} />
                }
                    
                   
                </View>
                <View style = {{margin : 10}}>
                    <Button title = "Take Image" onPress = {() => {this.imageHandler()}} />
                </View>
            </View>
        )
    }
    
}

export default ImageSelector