import React, {useState} from 'react'
import makePost from '../../markov/generatePost'

export default function SingleTweet({user}) {
  const [tweet, setTweet] = useState('')
  const generateTweet = async twitterName => {
    setTweet(await makePost(twitterName))
  }
  return (
    <div>
      <h4>{user.twitterName}</h4>
      <div>{tweet}</div>
      <button type="button" onClick={() => generateTweet(user.twitterName)}>
        Generate Tweet
      </button>
    </div>
  )
}
