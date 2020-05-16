import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import {Provider} from 'react-redux'
import store from './redux/store'
//import {Router} from 'react-router-dom'
//import history from './history'
//import App from './app'

// establishes socket connection
//import './socket'

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('app')
// )

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
)
