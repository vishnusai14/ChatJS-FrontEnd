import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as actionTypes from '../store/creators/chatCreators'
import { connect } from 'react-redux'
import axiosInstance from '../services/axiosInstance'

import Spinner from "../components/spinner"

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

class StartUp extends Component {

    componentDidMount = () => {
      
        const tryLogin = async() => {
            const userData = await AsyncStorage.getItem('TOKEN')
            console.log(userData)
            if(!userData) {
                this.props.navigation.navigate({routeName : 'Auth'})
                return
            }

            console.log(userData)

            axiosInstance.get('/user/getAll')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

            // this.props.fetchAllUser() //This Has To Be Changed
            this.props.setToken(JSON.parse(userData).token)
            this.props.navigation.navigate({routeName : 'Main'})

        }

        tryLogin()
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
        // fetchAllUser : () => {dispatch(actionTypes.fetchAllUser())}
    }
} 


export default connect(mapStateToProps, mapDispatchToProps)(StartUp)