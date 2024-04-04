import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import axiosConfig from '../../axiosConfig';
import '../styles/signin.css';


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginerror, setLoginError] = useState('');
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log("Trying to log in")

    try {
      console.log("Sending request");

      const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password,
      });

      console.log(response);

      const { user, token } = response.data;
      
      if (!user) {
        throw new Error(response.data.error);
      }

      console.log(`Recieved response: ${token}, setting it to local storage`)
      console.log(`User` + user)

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
      

      setLoggedIn(true);

     
    } catch (error) {
      console.log("Entered error handler")
      console.error(error);

      setLoginError(error);

    } 
  };

  useEffect(()=>{
    console.log("Login status changed: ", loggedIn);
  },[loggedIn])

  return (
    <div className="container">
      <div className="image2">
        <div className="signin-box">
          <h1>Sign In</h1>
          {!loggedIn ? (
            <form onSubmit={handleSignIn}>
              <label>Username</label>
              <input
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="action">
                <button type="submit" className="sign_up-button">
                  Sign In
                </button>
              </div>
              <p className="para-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>              
              {loginerror && <div className="error-message"><p>{loginerror.message}</p></div>}

            </form>
          ) : (
            <p>You are now signed in.</p>

          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;