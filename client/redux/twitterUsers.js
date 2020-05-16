import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

//action constants
const SET_TWITTER_NAMES = 'SET_TWITTER_NAMES'
const ADD_TO_TWITTER_NAMES = 'ADD_TO_TWITTER_NAMES'

//action creators
const setTwitterNames = twitterNames => ({
  type: SET_TWITTER_NAMES,
  twitterNames
})
//thunks
export const fetchTwitterUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/tweets/twitterUsers')
    dispatch(setTwitterNames(data))
  } catch (err) {
    console.log(err.message)
  }
}

//reducer

export const twitterNameReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TWITTER_NAMES:
      return action.twitterNames
    case ADD_TO_TWITTER_NAMES:
      return action.twitterNames
    default:
      return state
  }
}
