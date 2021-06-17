import React, { Component } from "react"
import { ScrollView, StyleSheet, View, Button,Image,Alert } from "react-native"
import { socket } from "../services/socketStuff"
import CustomInput from "../components/customInput"
import Spinner from "../components/spinner"
import ErrorText from "../components/errorText"
import axiosInstance from '../services/axiosInstance'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { connect } from 'react-redux'
import * as actionTypes from '../store/creators/chatCreators'
import * as Notifications from 'expo-notifications'
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

  
    navigationListener = undefined
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
        userName : "",
        expoToken : ""
    }

    getNotificationPermissionAndToken = async() => {
        const obj = await Notifications.getPermissionsAsync()
        
          if(obj.status !== 'granted') {
            const notificationObj = await Notifications.requestPermissionsAsync()
            if(notificationObj.status === 'granted') {
              const tokenObj = await Notifications.getExpoPushTokenAsync()
              this.setState(prevState => ({
                  ...prevState,
                  expoToken : tokenObj.data
              }))
            }
             
          }else if(obj.status === 'granted') {
            const tokenObj = await Notifications.getExpoPushTokenAsync()
            this.setState(prevState => ({
                ...prevState,
                expoToken : tokenObj.data
            }))
          }
        
      }

      componentDidMount = () => {
            this.getNotificationPermissionAndToken()
            this.navigationListener = this.props.navigation.addListener('willFocus' , () => {
                this.getNotificationPermissionAndToken()
            })
      }

      componentWillUnmount = () => {
        this.navigationListener.remove()
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
        if(email === "") {
            Alert.alert('Fill It' , 'Please Check All The Field' , [{text : 'Ok'}])
            return
        }
        if(password === "") {
            Alert.alert('Fill It' , 'Please Check All The Field' , [{text : 'Ok'}])
            return
            
        }
        if(userName === "") {
            Alert.alert('Fill It' , 'Please Check All The Field' , [{text : 'Ok'}])
            return
        }
        console.log(email, password, userName)
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        
       
        let data = {
            userName : userName,
            password : password,
            email : email,
            socketId : socket.id,
            expoToken : this.state.expoToken
        }

        AsyncStorage.setItem('userDetail', JSON.stringify({
            email : data.email,
            userName : data.userName,
            password : data.password,
            socketId : data.socketId,
            expoToken : data.expoToken
        }))

        axiosInstance.post("/otp/sendotp", data)
        .then((res) => {
            console.log(res)
            AsyncStorage.setItem('OTP' , JSON.stringify({
                otp : res.data.data
            }))
            this.setState(prevState => ({
                ...prevState,
                isLoading : false
            }))
            this.props.navigation.navigate({routeName : 'OtpVerify', params : {data : data}})
        })
        .catch((err) => {
            this.setState(prevState => ({
                ...prevState,
                isLoading : false
            }))
            Alert.alert('Error' , 'Try Again After SomeTime', [{text : 'ok'}])
        })

        
    }


    login = async(email, password, userName) => {
        if(email === "") {
            Alert.alert('Fill It' , 'Please Check All The Field' , [{text : 'Ok'}])
            return
        }
        if(password === "") {
            Alert.alert('Fill It' , 'Please Check All The Field' , [{text : 'Ok'}])
            return
            
        }
        if(userName === "") {
            Alert.alert('Fill It' , 'Please Check All The Field' , [{text : 'Ok'}])
            return
        }
        console.log(email, password, userName)
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        
       
        let data = {
            userName : userName,
            password : password,
            email : email,
            socketId : socket.id,
            expoToken : this.state.expoToken
        }
        console.log(data)
        axiosInstance.post('/auth/login' , data)
        .then((res) => {
            console.log(res)
            const token = res.data.data
            this.props.setToken(token)
            AsyncStorage.setItem('TOKEN' , JSON.stringify({
                token : token
            }))
            this.props.navigation.navigate({routeName : 'Main'})
        })
        .catch((err) => {
            Alert.alert('Some Error' , 'Please Check All The Field or Try Again' , [{text : 'Ok'}])
            this.setState(prevState => ({
                ...prevState,
                isLoading : false,
                email : "",
                pasword : "",
                userName : ""
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

const mapStateToProps = (state) => {
    return {
        token : state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken : (token) => {dispatch(actionTypes.setToken(token))},
        setUser : (userArr) => {dispatch(actionTypes.setUser(userArr))}
    }
} 



export default connect(mapStateToProps, mapDispatchToProps)(Auth)


