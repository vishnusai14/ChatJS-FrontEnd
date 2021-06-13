import AsyncStorage from "@react-native-async-storage/async-storage"
import { io } from "socket.io-client"
import { Platform } from "react-native"
let url = Platform.OS === 'web' ? 'http://localhost:1331' : 'http://192.168.43.225:1331'
export const  socket = io(url)
