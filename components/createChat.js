import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const CreateChat = (props) => (
  <FAB
    style={styles.fab}
    large
    icon="plus"
    onPress={() => {props.onSelect()}}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default CreateChat