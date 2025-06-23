import { connectSocket, getSocket } from '../../hooks/sockets';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/AuthForm.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { setIsAuth, isAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    
    const res = await axios.post('http://localhost:5000/api/login', {
      email,
      password,
    }, {
      withCredentials: true 
    });

    
    const checkAuth = await axios.get('http://localhost:5000/api/check_auth', {
      withCredentials: true 
    });

    console.log(checkAuth.data);
    localStorage.setItem("isAuthenticated", checkAuth.data.isAuthenticated);
    setIsAuth(true);
    
    navigate('/start-learning');
    
  } catch (err) {
    console.error('Login failed:', err);
    alert('Email/Password Login Failed');
  }
};


  const handleGoogleLogin = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);

  
    const res = await axios.post('http://localhost:5000/api/auth/google', {
      email: decoded.email,
      name: decoded.name,
      google_id: decoded.sub,
    }, {
      withCredentials: true 
    });

   
    const checkAuth = await axios.get('http://localhost:5000/api/check_auth', {
      withCredentials: true 
    });

    console.log(checkAuth.data);
    localStorage.setItem("isAuthenticated", checkAuth.data.isAuthenticated);
    setIsAuth(true);
    
    navigate('/start-learning');
    
  } catch (err) {
    console.error(err);
    alert('Google Sign-In failed');
  }
};



  return (
    <>
    {
    isAuth ==="true" ? (<p> You are already logged in </p>)
    :(
    <GoogleOAuthProvider clientId="1043787163792-ta7a54gkrv3ooj3rarj7ktgi7peijb5b.apps.googleusercontent.com">
      <div className="auth-container">
        <h2>Sign In</h2>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert('Google Login Failed')}
        />

        <p style={{ marginTop: '1rem' }}><span>or</span></p>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </GoogleOAuthProvider>
    )
     }
    </>

  );
}

export default SignIn;
