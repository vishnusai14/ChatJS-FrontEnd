import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import ChatPerson from '../components/ChatPerson'
import CreateChat from '../components/createChat'
import { socket } from "../services/socketStuff"
import { connect } from 'react-redux'
import { fetchUsers, getUser, saveUserToDb } from '../services/sqlitedb'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosInstance from '../services/axiosInstance'
import * as Notifications from 'expo-notifications'
import Spinner from '../components/spinner'
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        
    }
})


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
})

class ChatListScreen extends React.Component {

    state = {
        users : this.props.users,
        isLoading : false
    }


    

    navigationListener = undefined
    componentDidMount = () => {
        console.log(this.state.users)
        console.log('Component Mounted')
        Notifications.addNotificationResponseReceivedListener(notification => console.log(notification))

        socket.on('msgReceive', async (data) => {
            const senderEmail = data.data.senderEmail
            const userState = [...this.state.users]
            const userToRearrange = userState.filter((e) => {
                console.log("This is From",e)
                return e.userEmail === senderEmail
            })[0]

            const newUserState = userState.filter((e) => {
                return e.userEmail !== senderEmail
            })
            let updateduserState = [userToRearrange]
            newUserState.forEach((e) => {
                updateduserState.push(e)
            })
            this.setState((prevState) => ({
                ...prevState,
                users : updateduserState
            }))
          
           
        })
        console.log(this.props.users, "This is From Chat List ")
        console.log(socket.id)
        let data = {
            token : this.props.token
        }

        this.navigationListener = this.props.navigation.addListener('willFocus' , () => {
            this.fetchUser()
        })
        
       socket.emit('newUser', data)
        
    }

   
    static navigationOptions = ( { navigation } ) => {
        return {
            title : 'ChatJS'
        }
    }

    fetchUser = async () => {
        this.setState(prevState => ({
            ...prevState,
            isLoading : true
        }))
        const userData = await AsyncStorage.getItem('TOKEN')
        const token = JSON.parse(userData).token
        let data = {
            token : token
        }
        axiosInstance.post('/friend/fetchUser', data)
            .then((res) => {
                console.log(res.data.data)
                let result = res.data.data
                this.setState(prevState => ({
                    ...prevState,
                    users : result,
                    isLoading : false
                }))
            })
            .catch((err) => {
                this.setState(prevState => ({
                    ...prevState,
                    
                    isLoading : false
                }))
            })
    }

    componentWillUnmount = () => {
        console.log("Component UnMounter")
        this.navigationListener.remove()
    }
    
    navigate = (email, userName, image) => {
        this.props.navigation.navigate({routeName : 'ChatMessageScreen', params : {email : email, userName : userName, image : image }})
    }
    newChat = () => {
        this.props.navigation.navigate({routeName : 'CreateNewChat'})
    }
    render() {
        console.log("This is From Statae" , this.state)
        return(
            this.state.isLoading ? <Spinner /> : 
            <View style = {styles.screen}>

                <FlatList data={this.state.users}
                                renderItem={(itemData) => {
                                    return (
                                        <ChatPerson user = {itemData.item.userName} image = {itemData.item.userImage} onSelect = {() => {this.navigate(itemData.item.userEmail, itemData.item.userName, itemData.item.userImage)}} />
                                    )
                                }}
                                keyExtractor={item => item.userId}
               />
                <CreateChat onSelect = {() => {this.newChat()}} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.token,
        users : state.users
    }
}


export default connect(mapStateToProps)(ChatListScreen)