import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import ChatPerson from '../components/ChatPerson'
import CreateChat from '../components/createChat'
import { socket } from "../services/socketStuff"
import { connect } from 'react-redux'
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        
    }
})

class ChatListScreen extends React.Component {
    componentDidMount = () => {
        console.log(socket.id)
        let data = {
            token : this.props.token
        }
        
       socket.emit('newUser', data)
    }

   
    static navigationOptions = ( { navigation } ) => {
        return {
            title : 'ChatJS'
        }
    }

    navigate = () => {
        this.props.navigation.navigate({routeName : 'ChatMessageScreen'})
    }
    newChat = () => {
        this.props.navigation.navigate({routeName : 'CreateNewChat'})
    }
    render() {
        return(
            <View style = {styles.screen}>
               <ChatPerson user = 'Vishnu Prasanna' image = 'test' onSelect = {() => {this.navigate()}} />
               <ChatPerson user = 'Vishnu Prasanna' image = 'test' onSelect = {() => {console.log('Selected')}} />
               <ChatPerson user = 'Vishnu Prasanna' image = 'test' onSelect = {() => {console.log('Selected')}} />
                <CreateChat onSelect = {() => {this.newChat()}} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.token
    }
}

export default connect(mapStateToProps)(ChatListScreen)