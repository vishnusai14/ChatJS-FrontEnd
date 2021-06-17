import React from 'react'
import { View, Text, ScrollView, FlatList  } from 'react-native'
import InputBar from '../components/InputBar'
import Message from '../components/Message'
import axiosInstance from '../services/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from '../components/spinner'
import { socket } from '../services/socketStuff'
import { Avatar } from 'react-native-paper'
class ChatMessageScreen extends React.Component  {
    flatList = React.createRef()
    navigationListener = undefined
    state = {
        isLoading : true,
        messages : [],
        sender : '',
        msg : ''
    }

    static navigationOptions = ({navigation}) => {
        return {
            title : navigation.getParam('userName'),
            headerRight : () => {
                return (
                    <View style = {{flexDirection : 'row', marginRight : 10}}>
                        <Avatar.Image size={30} source={{uri : navigation.getParam('image')}} />
                    </View>
                )
            }
        }
        
    }

    sendMsg = async () => {
        let data = {
            _id : Math.random().toString(),
            message : this.state.msg,
            senderEmail : this.state.sender,
            receiverEmail : this.props.navigation.getParam('email')
        }
       
        const userData = await AsyncStorage.getItem('TOKEN')
        socket.emit('msg' , {msg : this.state.msg , email : this.props.navigation.getParam('email'), token : JSON.parse(userData).token})
        this.setState((prevState) => ({
            ...prevState,
            messages : [...prevState.messages, data],
            msg : ''
        }))
        
    }

    loadMessages = async () => {
        console.log("Load Message")
        const userData = await AsyncStorage.getItem('TOKEN')

        let data = {
            token : JSON.parse(userData).token,
            email : this.props.navigation.getParam('email')
        }
        axiosInstance.post('/message/getAllmessage', data)
        .then((res) => {
            console.log("This is After Loading" ,res.data)
            let data = res.data.data
            let senderEmail = data.email
            let msgs = data.msgs

            this.setState(prevState => ({
                ...prevState,
                isLoading : false,
                messages : msgs,
                sender : senderEmail
            }))
        })
        .catch((err) => {
            this.setState(prevState => ({
                ...prevState,
                isLoading : false
            }))
        })
    }


    componentDidMount = () => {
        socket.on('msgReceive', (data) => {
            console.log(data.data)
            let updateData = {
                _id : Math.random().toString(),
                senderEmail : data.data.senderEmail,
                receiverEmail : data.data.receiverEmail,
                message : data.data.message
            }
            console.log(this.props.navigation.isFocused())
           if(this.props.navigation.isFocused()) {
                this.setState((prevState) => ({
                    ...prevState,
                    messages : [...prevState.messages, updateData]
                }))
           }
            
        })
        this.navigationListener = this.props.navigation.addListener('willFocus' , () => {
            this.loadMessages()
        })
        this.loadMessages()
    }

    componentWillUnmount = () => {
        this.navigationListener.remove()
    }
    textHandler = (text) => {
        console.log(text)
        this.setState(prevState => ({
            ...prevState,
            msg : text
        }))
    }
   
    render() {
        // socket.on('msg' , (data) => {
        //     console.log(data)
        // })
        return (
            <View>
                <View style = {{height : '85%'}}> 
                {this.state.isLoading ? <Spinner /> :
                <FlatList onContentSizeChange={() => {this.flatList.current.scrollToEnd()}} ref = {this.flatList} keyExtractor={item => item._id} data = {this.state.messages} renderItem = {(itemData) => {
                    return (
                        <Message isSent = {this.state.sender === itemData.item.senderEmail ? true : false} msg = {itemData.item.message}   />
                    )
                }}  />
                
                }
                </View>
               
               <InputBar value = {this.state.msg} onChangeText = {(text) => {this.textHandler(text)}} onPress = {(msg) => {this.sendMsg(msg)}} />
            </View>
            
          )
    }
  
}


export default ChatMessageScreen



