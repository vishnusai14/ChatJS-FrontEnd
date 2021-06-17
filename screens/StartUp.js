import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as actionTypes from '../store/creators/chatCreators'
import { connect } from 'react-redux'
import Spinner from "../components/spinner"
import NetInfo from "@react-native-community/netinfo"
import axiosInstance from '../services/axiosInstance'
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

class StartUp extends Component {


    netListener = undefined
    state = {
        netCondition : undefined
    
    }
    componentDidMount = () => {
      
        this.netListener = NetInfo.addEventListener(state => {
            this.setState(prevState => ({
                ...prevState ,
                netCondition : state.isConnected
            }))
           
          })
        const tryLogin = async() => {
            const userData = await AsyncStorage.getItem('TOKEN')
            const otp = await AsyncStorage.getItem('OTP')
            console.log("This is" , otp)
            console.log(otp !== null || otp !== undefined)
            if(otp !== null && otp !== undefined) {
                this.props.navigation.navigate({routeName : 'Otp'})
                return
            }
            if(!userData) {
                this.props.navigation.navigate({routeName : 'Auth'})
                return
            }
            

            const token = JSON.parse(userData).token
            let data = {
                token : token
            }

            axiosInstance.post('/friend/fetchUser', data)
            .then((res) => {
                console.log(res.data.data)
                let result = res.data.data
                this.props.setUser(result)
            })
            .catch((err) => {
                console.log(err)
            })
                        
            this.props.setToken(JSON.parse(userData).token)
            this.props.navigation.navigate({routeName : 'Main'})

        }

        tryLogin()
    }

    componentWillUnmount = () => {
        this.netListener()
    }
    render() {
        return (
            <View style = {styles.screen}>
                <Spinner />
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
        setUser : (userArr) => {dispatch(actionTypes.setUser(userArr))}
    }
} 


export default connect(mapStateToProps, mapDispatchToProps)(StartUp)