import React from 'react'
import SingleTweet from './SingleTweet'

export default function UserList({users}) {
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
