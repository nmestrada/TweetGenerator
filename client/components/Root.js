import React, {Component} from 'react'
import UsernameForm from './UsernameForm'

class Root extends Component {
  render() {
    return (
      <div id="container">
        <h1>Welcome to Tweet Generator!</h1>
        <h3>Enter a twitter username to get started!</h3>
        <UsernameForm />
      </div>
    )
  }
}

export default Root
