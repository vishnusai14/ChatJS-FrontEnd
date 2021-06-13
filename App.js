
import React from 'react'

import MainNavigator from './navigation/ChatNavigator'
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import chatReducer from './store/reducers/chatReducers'
import { init } from './services/sqlitedb.js'

init()
.then((res) => {
  console.log(res)
})
.catch((err) => {
  console.log(err)
})

const store = createStore(chatReducer)
class App extends React.Component {


  render() {
    return (
      <Provider store = {store}>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </Provider>
       )

  }
}

export default App

