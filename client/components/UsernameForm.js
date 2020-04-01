import React, {useState} from 'react'
import axios from 'axios'
const UsernameForm = () => {
  const [username, setUsername] = useState('')
  const handleSubmit = async event => {
    event.preventDefault()
    await axios.post('/api/tweets', {username})
    //clear form
    setUsername('')
  }
  const handleChange = event => {
    setUsername(event.target.value)
  }
  return (
    <div id="form">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="input">
            Twitter Handle:
            <input
              className="form-control"
              onChange={handleChange}
              type="text"
              name="username"
              value={username}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  )
}

export default UsernameForm
