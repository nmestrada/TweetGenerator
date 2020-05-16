import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import SingleTweet from './SingleTweet'
import {fetchTwitterUsers} from '../redux/twitterUsers'

export default function UserList() {
  const users = useSelector(state => state.twitterUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTwitterUsers())
  }, [])
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <SingleTweet user={user} />
        </div>
      ))}
    </div>
  )
}
