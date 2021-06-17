import  React from 'react';
import {  Card,  Paragraph } from 'react-native-paper';
import {StyleSheet } from 'react-native'  

const styles = StyleSheet.create({
    message : {
       
        marginBottom : 20,
        width : '70%',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    
})

const Message = (props) => (
  
        <Card style = {{...styles.message, marginLeft : props.isSent ? 'auto' : 0}}>
            <Card.Content style = {styles.content}>
                <Paragraph style = {styles.text}>{props.msg}</Paragraph>
            </Card.Content>  
        </Card>



   
);

export default Message