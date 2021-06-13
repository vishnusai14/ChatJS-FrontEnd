import  React from 'react';
import {  Card,  Paragraph } from 'react-native-paper';
import {StyleSheet } from 'react-native'  

const styles = StyleSheet.create({
    message : {
        height :150,
        width : '50%',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
})

const Message = (props) => (
  
        <Card style = {{...styles.message, marginLeft : props.isSent ? 'auto' : 0}}>
            <Card.Title style = {styles.title} title="Card Title" />
            <Card.Content style = {styles.content}>
                <Paragraph style = {styles.text}>This is A Very Long message Displaying Here Don't Worry This has To Work</Paragraph>
            </Card.Content>  
        </Card>



   
);

export default Message