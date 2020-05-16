import React from 'react'
import UsernameForm from './UsernameForm'
import TwitterUsers from './TwitterUsers'

const Root = () => {
  return (
    <div id="container">
      <h1>Welcome to Tweet Generator!</h1>
      <h3>Enter a twitter username to get started!</h3>
      <UsernameForm />
      <h2>Pre-loaded Twitter Users</h2>
      <TwitterUsers />
    </div>
  )
}

export default Root
