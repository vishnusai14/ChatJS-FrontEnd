import React from 'react'
import { View, KeyboardAvoidingView, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { TextInput  } from 'react-native-paper'
const InputBar = (props) => {
    
        return (
           
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <TextInput value = {props.value} onChangeText = {(value) => {props.onChangeText(value)}} placeholder="Message" style={styles.textInput} right={<TextInput.Icon name="send" onPress = {() => {props.onPress()}} />} />

                    </View>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
          
          )
    }
  


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,

  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },

})

export default InputBar



