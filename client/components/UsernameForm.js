import React, {useState} from 'react'

const UsernameForm = () => {
  const [username, setUsername] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    console.log('submitted!', username)
    //ajax call to api
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
