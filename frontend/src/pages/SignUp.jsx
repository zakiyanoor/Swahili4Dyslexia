import React ,{useState} from 'react';
import axios from 'axios';
import '../styles/AuthForm.css';
import { useNavigate } from 'react-router-dom';

function SignUp(){
    const[email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [username, setUsername] = useState('');

    const handleSignup = async (e) =>{
        e.preventDefault();
        try{
            const res =await axios.post(`http://localhost:5000/api/signup`,{
                 username,
                email,
                password,
            });
            alert('Account created!')
             navigate('/');
        } catch(err){
            alert('Signup failed')
        }
         
    }
    return(
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup} className="auth-form">
                 <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  />
                <input type="email" placeholder='Email'
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
                <input type="password" 
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
                <button type="submit">Sign Up</button>

            </form>
        </div>
   
    )
}
export default SignUp;