import axios from 'axios'
import { Platform } from 'react-native'
const axiosInstance = axios.create({

    baseURL : Platform.OS === 'web' ? 'http://localhost:1331/api/v1' : 'http://192.168.43.225:1331/api/v1' 
})

export default axiosInstance
