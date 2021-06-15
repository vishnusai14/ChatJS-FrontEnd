import React from 'react'
import { View, ScrollView, StyleSheet, Button } from 'react-native'
import ImageSelector from '../components/imageSelector'
import { TextInput } from 'react-native-paper'
import axiosInstance from '../services/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from '../components/spinner'
const styles = StyleSheet.create({
    form : {
        margin : 20
    },
    buttonContainer : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    text : {
        margin : 20
    }
})



class UserProfileScreen extends React.Component {

    state = {
        isLoading : true,
        userName : "",
        userId : "",
        userEmail : ""
    }
    navigationListener = undefined

    seturi = (uri) => {
        console.log(uri)
    }

    componentDidMount = () => {
        this.navigationListener = this.props.navigation.addListener('willFocus' , () => {
            this.fetchUserDetails()
        })
        this.fetchUserDetails()
    }

    componentWillUnmount = () => {
        this.navigationListener.remove()
    }

    fetchUserDetails = async () => {
        
        const userData = await AsyncStorage.getItem('TOKEN')
        const user = JSON.parse(userData).token

        axiosInstance.get(`/user//userdetail/${user}`)
        .then((res) => {
            this.setState(prevState => ({
                ...prevState,
                isLoading : false,
                userEmail : res.data.data.userEmail,
                userId : res.data.data.userId,
                userName : res.data.data.userName
            }))
        })
        .catch((err) => {
            this.setState(prevState => ({
                ...prevState,
                isLoading : false
            }))
            console.log(err)
        })
    }

    render() {
     

        return (
            this.state.isLoading ? <Spinner /> : 
            <ScrollView>
                <View style = {styles.form}>
                   
                    <ImageSelector imageTaken = {(uri) => {this.seturi(uri)}} />
                    <View style = {styles.text}>
                        <TextInput disabled = {true} label="User Id" value={this.state.userId}  />
                    </View>
                    <View  style = {styles.text}>
                        <TextInput disabled = {true} label="Email" value={this.state.userEmail} />
                    </View >
                    <View  style = {styles.text}>
                        <TextInput disabled = {true} label="UserName" value={this.state.userName}  />
                    </View>
                    <View style ={styles.buttonContainer}>
                        <Button   title = "Save" onPress = {() => {this.savePlace()}} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}


export default UserProfileScreen