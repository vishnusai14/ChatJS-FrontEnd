import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import ChatPerson from '../components/ChatPerson'
import CreateChat from '../components/createChat'
import { socket } from "../services/socketStuff"
import { connect } from 'react-redux'
import { fetchUsers, getUser, saveUserToDb } from '../services/sqlitedb'
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        
    }
})

class ChatListScreen extends React.Component {

    state = {
        users : this.props.users
    }
    navigationListener = undefined
    componentDidMount = () => {

        socket.on('msgReceive', async (data) => {
            console.log("Message ON")
            let userResult = await getUser(data.data.userId)
            if(userResult.rows._array.length === 0) {
                console.log("Entering To Save User")
                await saveUserToDb(data.data.userName, data.data.userId, data.data.senderEmail)
                if(this.props.navigation.isFocused()){
                    this.fetchUser()
                }
               
            }
            console.log()
           
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
        const dbResult = await fetchUsers()
        this.setState(prevState => ({
            ...prevState,
            users : dbResult.rows._array
        }))
    }

    componentWillUnmount = () => {
        console.log("Component UnMounter")
        this.navigationListener.remove()
    }
    
    navigate = (email) => {
        this.props.navigation.navigate({routeName : 'ChatMessageScreen', params : {email : email }})
    }
    newChat = () => {
        this.props.navigation.navigate({routeName : 'CreateNewChat'})
    }
    render() {
        console.log("This is From Statae" , this.state)
        return(
            <View style = {styles.screen}>

                <FlatList data={this.state.users}
                                renderItem={(itemData) => {
                                    return (
                                        <ChatPerson user = {itemData.item.userName} image = 'test' onSelect = {() => {this.navigate(itemData.item.userEmail)}} />
                                    )
                                }}
                                keyExtractor={item => item.id.toString()}
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