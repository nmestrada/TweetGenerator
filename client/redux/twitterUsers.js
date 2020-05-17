import axios from 'axios'

//action constants
const SET_TWITTER_NAMES = 'SET_TWITTER_NAMES'
const ADD_TO_TWITTER_NAMES = 'ADD_TO_TWITTER_NAMES'

//action creators
const setTwitterUsers = twitterUsers => ({
  type: SET_TWITTER_NAMES,
  twitterUsers
})

const addToTwitterUsers = twitterUser => ({
  type: ADD_TO_TWITTER_NAMES,
  twitterUser
})
//thunks
export const fetchTwitterUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/twitterUsers')
    dispatch(setTwitterUsers(data))
  } catch (err) {
    console.log(err.message)
  }
}

export const addTwitterUser = twitterName => async dispatch => {
  try {
    const {data} = await axios.post('/api/twitterUsers', {twitterName})
    dispatch(addToTwitterUsers(data))
  } catch (err) {
    console.log(err.message)
  }
}
//reducer

export default function twitterNameReducer(state = [], action) {
  switch (action.type) {
    case SET_TWITTER_NAMES:
      return action.twitterUsers
    case ADD_TO_TWITTER_NAMES:
      return [...state, action.twitterUser]
    default:
      return state
  }
}
