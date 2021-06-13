import React from 'react';
import CustomInput from '../components/customInput'
import { View, Button, StyleSheet, Alert } from 'react-native'
import Spinner from '../components/spinner'
import axiosInstance from '../services/axiosInstance'
import { getUser, saveUserToDb } from '../services/sqlitedb'
const styles = StyleSheet.create({
    inputContainer : {
        padding : 10
    }
})
class CreateNewChat extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title : 'Create New Chat'
        }
    }
    state = {
        id : '' ,
        name : '',
        isLoading: false
    }

    idHandler = (text) => {
        this.setState(prevState => ({
            ...prevState,
            id : text
        }))
    }

    nameHandler = (text) => {
        this.setState(prevState => ({
            ...prevState,
            name : text
        }))
    }

    saveUser = () => {
        console.log('Saving User')
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        let data = {
            id : this.state.id
        }

        getUser(this.state.id)
        .then((res) => {
            console.log(res)
            if(res.rows._array.length > 0) {
                console.log(res)
                this.setState(prevState => ({
                    ...prevState,
                    isLoading : false
                }))
                Alert.alert('User Already Saved', 'This User Was already in your Contact', [{text : 'Ok'}]) 
                return
            }else {
                axiosInstance.post("/user/checkUser" , data)
                .then((res) => {
                   
                    
                    saveUserToDb(this.state.name, this.state.id)
                    .then((response) => {
                        this.setState(prevState => ({
                            ...prevState,
                            isLoading : false
                        }))
                        Alert.alert('User Saved' , 'The User Has Been Saved..Start Chat' , [{text : 'Ok'}])
                    })
                    .catch((err) => {
                        this.setState(prevState => ({
                            ...prevState,
                            isLoading : false
                        }))
                        Alert.alert('User Not Saved' , 'Please Try Again' , [{text : 'ok'}])
                    })
                })
                .catch((err) => {
                    this.setState(prevState => ({
                        ...prevState,
                        isLoading : false
                    }))
                    Alert.alert('User Not Saved' , 'Please Check The ID Of The User ' , [{text : 'ok'}])
                    console.log(err.message)
                })
            }
            
        })
        .catch((err) => {
            console.log(err)
        })

       
    }
  
    render() {
        return (
                this.state.isLoading ? <Spinner /> :
                <View>
                    <View style = {styles.inputContainer}>
                        <CustomInput textChangeHandler = {(text) => {this.idHandler(text)}} label = 'Id' value = {this.state.id} />
                        <CustomInput textChangeHandler = {(text) => {this.nameHandler(text)}} label = 'Name' value = {this.state.name} />
                    </View>
                    <View>
                    <Button title = 'Save User' onPress = {() => {this.saveUser()}} />
                    </View>
                    
                </View>
          )
    }
 
}

export default CreateNewChat 