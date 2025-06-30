
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
  const { setIsAuth, setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signout', {}, { withCredentials: true }); 

      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      }, { withCredentials: true });

      const { role, email: returnedEmail, user_id } = res.data;
      console.log("Logged in as:", role);

      setIsAuth(true);
      setUser({ email: returnedEmail, role });
      localStorage.setItem("userRole", role);
      localStorage.setItem("user_id", user_id);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/start-learning');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Email or password is incorrect.');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await axios.post('http://localhost:5000/api/signout', {}, { withCredentials: true }); 

      const decoded = jwtDecode(credentialResponse.credential);
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
      }, { withCredentials: true });

      const { role, email: returnedEmail, user_id } = res.data;
      console.log("Google login role:", role);

      setIsAuth(true);
      setUser({ email: returnedEmail, role });
      localStorage.setItem("userRole", role);
      localStorage.setItem("user_id", user_id);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/start-learning');
      }
    } catch (err) {
      console.error('Google Sign-In failed:', err);
      alert('Google login failed.');
    }
  };

  return (
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
  );
}

export default SignIn;
