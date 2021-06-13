import React from 'react'
import { View, Text, ScrollView  } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import InputBar from '../components/InputBar'
import Message from '../components/Message'


class ChatMessageScreen extends React.Component  {
 

    sendMsg = async () => {
        const id = await AsyncStorage.getItem('SOCKET_ID')
        const socketId = JSON.parse(id).ID
        console.log(socketId)
        // socket.emit('msg' , {msg : 'Hello' , socketId : socketId})
    }

    

   
    render() {
        // socket.on('msg' , (data) => {
        //     console.log(data)
        // })
        return (
            <View>
                <View style = {{height : '85%'}}> 
                <ScrollView>
                    <Message />
                    <Message isSent = {true} />
                    <Message />
                    <Message isSent = {true} />
                    <Message isSent = {true} />
                    <Message />
                    <Message />
                    <Message isSent = {true} />
                    <Message isSent = {true} />
                    <Message />
                    <Message />
                    <Message />
                    <Message isSent = {true} />
                    <Message />
                    <Message />
                    <Message isSent = {true} />
                    <Message />
                    <Message />
                    <Message isSent = {true} />
                    <Message />
                    <Message isSent = {true} />
                    <Message />
                </ScrollView>
                </View>
               
               <InputBar onPress = {() => {this.sendMsg()}} />
            </View>
            
          )
    }
  
}


export default ChatMessageScreen



