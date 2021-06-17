import { io } from "socket.io-client"
let url = 'https://chat2js.herokuapp.com'
export const  socket = io(url, {
    transports: ['websocket'], 
    jsonp: false 
  
})
