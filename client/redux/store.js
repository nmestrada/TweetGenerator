import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import twitterUsers from './twitterUsers'

const reducer = combineReducers({
  twitterUsers
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

export default store
