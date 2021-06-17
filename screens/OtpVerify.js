import React from 'react'
import CustomInput from '../components/customInput'
import { View, Button,Alert,StyleSheet } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axiosInstance from '../services/axiosInstance'
import { connect } from 'react-redux'
import * as actionTypes from '../store/creators/chatCreators'

const styles = StyleSheet.create({
    screen : {
        padding : 20,
        margin : 20
    },
    buttonContainer: {
        flexDirection : 'row',
        padding : 20,
        margin : 20,
        justifyContent : 'space-between',
        alignItems : 'center'
    }
})

class OtpVerify extends React.Component {
    state = {
        otp : '',
    }

    otpHandler = (text) => {
        this.setState(prevState => ({
            ...prevState,
            otp : text
        }))
    }

    componentDidMount = () => {
        console.log("Component Mount")
        console.log(this.props.navigation.getParam('data'))
    }

    changeNumber = async () => {
        await AsyncStorage.removeItem('OTP')
        this.props.navigation.navigate({routeName : 'Auth'})
    }


    checkOtp = async () => {
        const otp = await AsyncStorage.getItem('OTP')
        console.log(otp)
        const otpNumber = JSON.parse(otp).otp
        if(otpNumber.toString() === this.state.otp) {
            await AsyncStorage.removeItem('OTP')
            this.setState(prevState => ({
                ...prevState,
                isLoading : true
            }))
            const userDetail = await AsyncStorage.getItem('userDetail')
            const email = JSON.parse(userDetail).email
            const userName = JSON.parse(userDetail).userName
            const socketId = JSON.parse(userDetail).socketId
            const password = JSON.parse(userDetail).password
            const expoToken = JSON.parse(userDetail).expoToken
            let data = {
                userName : userName,
                password : password,
                email : email,
                socketId : socketId,
                expoToken : expoToken
            }
            axiosInstance.post('/auth/signup' , data)
            .then(async (res) => {
                console.log(res)
                const token = res.data.data
                this.props.setToken(token)
                await AsyncStorage.setItem('TOKEN' , JSON.stringify({
                    token : token
                }))
                AsyncStorage.removeItem('userDetail')
                this.props.navigation.navigate({routeName : 'Main'})
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Some Error' , 'The User Already Exists' , [{text : 'Ok'}])
                this.setState(prevState => ({
                    ...prevState,
                    isLoading : false,
                    email : "",
                    pasword : "",
                    userName : ""
                }))
            })
        }else {
            Alert.alert("Error" , "Please Enter The Correct Otp", [{text : 'Ok'}])
            return
        }
    }


    render() {
        return (
            <View style = {styles.screen}>
            
                <CustomInput maxLength = {5} secureTextEntry = {true} keyboardType = 'number-pad' textChangeHandler = {(text) => {this.otpHandler(text)}} label = 'OTP' value = {this.state.otp} />
                <View style = {styles.buttonContainer}>
                    <Button onPress = {() => {this.checkOtp()}} title = 'Check' /> 
                    <Button onPress = {() => {this.changeNumber()}} title = 'Change Number' />
                </View>
            </View>
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
       
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerify)

