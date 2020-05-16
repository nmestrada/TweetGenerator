import React, {useState} from 'react'
import UsernameForm from './UsernameForm'
import makePost from '../../markov/generatePost'

const Root = () => {
  const [tweet, setTweet] = useState('')
  const generateTweet = async twitterName => {
    setTweet(await makePost(twitterName))
  }
  return (
    <div id="container">
      <h1>Welcome to Tweet Generator!</h1>
      <h3>Enter a twitter username to get started!</h3>
      <UsernameForm />
      <h2>Pre-loaded Twitter Users</h2>
      <h4>realDonaldTrump</h4>
      <div>{tweet}</div>
      <button type="button" onClick={() => generateTweet('realdonaldtrump')}>
        Generate Tweet
      </button>
    </div>
  )
}

export default Root
