import React, {useState} from 'react'
import makePost from '../../markov/generatePost'

export default function SingleTweet({user}) {
  const [tweet, setTweet] = useState('')
  const generateTweet = async () => {
    setTweet(await makePost())
  }
  return (
    <div>
      <h4>{user.name}</h4>
      <div>{tweet}</div>
      <button type="button" onClick={generateTweet}>
        Generate Tweet
      </button>
    </div>
  )
}
