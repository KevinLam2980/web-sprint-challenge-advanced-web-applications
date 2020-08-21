import React, {useState} from "react";
import { useHistory } from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
})
const History = useHistory()

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const onHandleChanges = evt => {
    setCredentials({...credentials, [evt.target.name]: evt.target.value })
}

  const login = evt => {
    evt.preventDefault()
   axiosWithAuth()
    .post('http://localhost:5000/api/login', credentials)
    .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        History.push('/bubbles')
    })
    .catch(err => {
        console.log(err)
    })
}
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
                <label htmlFor='username'>
                    <input
                    type='text'
                    placeholder='Enter username'
                    id='username'
                    name='username'
                    onChange={onHandleChanges}
                    value={credentials.username}
                    >
                    </input>
                </label>
                <label htmlFor='password'>
                    <input
                           type='password'
                           placeholder='Enter password'
                           id='password'
                           name='password'
                           onChange={onHandleChanges}
                           value={credentials.password}
                    >
                    </input>
                </label>
                <button>Login</button>
            </form>
    </>
  );
};

export default Login;
