import React, { Component } from "react"
import { ScrollView, StyleSheet, View, Button,Image } from "react-native"
import { socket } from "../services/socketStuff"
import CustomInput from "../components/customInput"
import Spinner from "../components/spinner"
import ErrorText from "../components/errorText"
import axiosInstance from '../services/axiosInstance'
import AsyncStorage from "@react-native-async-storage/async-storage"
const styles = StyleSheet.create({
    product: {
        elevation : 8,
        borderRadius : 10,
        backgroundColor : 'white',
        height : 750,
        margin : 10,
        justifyContent : 'center'
     
    },
    image : {
        width : '100%',
        height : '60%'
    },
    details : {
        alignItems : 'center' ,
        padding : 10,
        height : '30%'
    },
    title :{
      
        fontSize : 18,
        marginVertical : 4,
    },
    price : {
     
        fontSize : 14,
        color: '#888'
    },  
    buttonContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 20,
        margin : 20
    }
})



class Auth extends Component {

  

    static navigationOptions = ({navigation}) => {
        return {
            title : 'Please Login',
            signUpError : undefined
        }
    }
    state = {
        error : undefined,
        isLoading : false,
        token : undefined,
        email : "",
        password : "",
        userName : ""
    }

    emailHandler = (text) => {
        this.setState(prevState => ({
            ...prevState,
            email : text
        }))
    }
    passwordHandler = (text) => {
        this.setState(prevState => ({
            ...prevState,
            password : text
        }))
    }
    userNameHandler = (text) => {
        this.setState(prevState => ({
            ...prevState,
            userName : text
        }))
    }
    signup = async (email, password, userName) => {
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        
       
        let data = {
            userName : userName,
            password : password,
            email : email,
            socketId : socket.id
        }
        axiosInstance.post('/auth/signup' , data)
        .then((res) => {
            const token = res.data.data
            AsyncStorage.setItem('TOKEN' , JSON.stringify({
                token : token
            }))
            this.props.navigation.navigate({routeName : 'Main'})
        })
        .catch((err) => {
            console.log(err.message)
            this.setState(prevState => ({
                ...prevState,
                isLoading : false
            }))
        })
    }



    render() {
        return (
            this.state.isLoading ? <Spinner /> : 
            <ScrollView >
                <View style = {styles.product}>
                <Image style = {styles.image} source = {{uri : 'https://png.pngtree.com/png-vector/20191116/ourmid/pngtree-young-service-boy-vector-download-user-icon-vector-avatar-png-image_1991056.jpg'}} />
                
                 {this.state.signUpError ? 
                <ErrorText errorText = {this.state.signUpError} />
                    : null }
                <View style = {styles.details}>
                <CustomInput label = "Email" textChangeHandler = {(text) => {this.emailHandler(text)}} value = {this.state.email} />
                
                <CustomInput label = "Password" secureTextEntry = {true} textChangeHandler = {(text) => {this.passwordHandler(text)}} value = {this.state.password} />
                
                <CustomInput label = "UserName" textChangeHandler = {(text) => {this.userNameHandler(text)}} />
                </View>
                <View style = {styles.buttonContainer}>
                    <Button title = "Login" onPress={() => {this.login(this.state.email, this.state.password)}} />
                    <Button title = "SignUp" onPress = {() => {this.signup(this.state.email, this.state.password, this.state.userName)}} />
                </View>
               
            </View>
            </ScrollView>
        )
    }
}



export default Auth


