import React from 'react'
import { View, ScrollView, StyleSheet, Button,TouchableOpacity,Alert } from 'react-native'
import ImageSelector from '../components/imageSelector'
import { TextInput } from 'react-native-paper'
import axiosInstance from '../services/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from '../components/spinner'
import { Ionicons } from '@expo/vector-icons'

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

    static navigationOptions = ({navigation}) => {
        return {
            headerRight : () => {
                return (
                    <TouchableOpacity onPress = {() => {navigation.getParam('logout')()}}>
                        <Ionicons name = 'md-log-out' color = 'black' size = {35} />
                    </TouchableOpacity>
                )
            }
        }
    }

    state = {
        isLoading : true,
        userName : "",
        userId : "",
        userEmail : "",
        uri : "",
        userImage : ""
    }
    navigationListener = undefined

    seturi = (uri) => {
        this.setState(prevState => ({
            ...prevState,
            uri : uri
        }))
    }

    componentDidMount = () => {
        this.props.navigation.setParams({logout : this.logout})
        this.navigationListener = this.props.navigation.addListener('willFocus' , () => {
            this.fetchUserDetails()
        })
        this.fetchUserDetails()
    }

    logout = () => {
       
        Alert.alert('Logout', 'Are You Sure To Logout' , [{text : 'Yes', onPress : () => {this.confirmLogOut()}}, {text : 'No'}])
    }
    confirmLogOut = async () => {
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        const userData = await AsyncStorage.getItem('TOKEN')
        const token = JSON.parse(userData).token
        let data = {
            token : token
        }
        axiosInstance.post('/logout/logoutuser', data)
        .then((res) => {
             AsyncStorage.removeItem('TOKEN')
            this.props.navigation.navigate({routeName : 'Auth'})
        })
        .catch((err) => {
             AsyncStorage.removeItem('TOKEN')
            this.props.navigation.navigate({routeName : 'Auth'})
        })
        
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
                userName : res.data.data.userName,
                userImage : res.data.data.userImage
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

    saveUser = async () => {
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        const userData = await AsyncStorage.getItem('TOKEN')
        const user = JSON.parse(userData).token
        let data = {
            url : this.state.uri,
            token : user
        }
        axiosInstance.post("/user/uploadImage" , data)
        .then((res) => {
            this.setState(prevState => ({
                ...prevState,
                isLoading : false,
                userImage : res.data.data
            }))
        })
        .catch((err) => {
            this.setState(prevState => ({
                ...prevState,
                isLoading : false
            }))
            Alert.alert('Not Saved' , 'Due To Some Technical Issuse Your Profile Not Updated' , [{text : 'Ok'}])
        })
    }

    render() {
     

        return (
            this.state.isLoading ? <Spinner /> : 
            <ScrollView>
                <View style = {styles.form}>
                   
                    <ImageSelector image = {this.state.userImage} imageTaken = {(uri) => {this.seturi(uri)}} />
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
                        <Button   title = "Save" onPress = {() => {this.saveUser()}} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}


export default UserProfileScreen