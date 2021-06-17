import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import ChatListScreen from '../screens/ChatListScreen'
import ChatMessageScreen from '../screens/ChatMessageScreen'
import UserProfileScreen from '../screens/UserProfileScreen'
import AuthScreen from '../screens/AuthScreen'
import StartUp from '../screens/StartUp'
import CreateNewChat from '../screens/CreateNewChat'
import OtpVerify from '../screens/OtpVerify'
import { Ionicons } from '@expo/vector-icons'

const chatListNavigator = createStackNavigator(
    {
        ChatListScreen : ChatListScreen,
        CreateNewChat : CreateNewChat,
        ChatMessageScreen : ChatMessageScreen,
        
    }
)

const userProgileNavigator = createStackNavigator(
    {
        UserProfileScreen : UserProfileScreen
    }
)

const mainNavigator = createBottomTabNavigator(
    {
        Chat :{
            screen : chatListNavigator,
            navigationOptions : () => {
                return {
                    tabBarIcon : () => {
                        return (
                            <Ionicons name = 'md-chatbubbles' color = 'black' size = {30} />
                        )
                    }
                }
                
            }
        },
        User : {
            screen : userProgileNavigator,
            navigationOptions : () => {
                return {
                    tabBarIcon : () => {
                        return (
                            <Ionicons name = 'md-person' color = 'black' size = {30} />
                        )
                    }
                }
            }
        }
    }
)


const AuthNavigator = createStackNavigator(
    {
        AuthScreen : AuthScreen
    }
)

const OtpNaivgator = createStackNavigator(
    {
        OtpVerify : OtpVerify
    }
)

const AuthChatNavigator = createSwitchNavigator(
    {
        StartUp : StartUp,
        Auth : AuthNavigator,
        Otp:OtpNaivgator,
        Main : mainNavigator
    }
)

export default createAppContainer(AuthChatNavigator)