import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup()
{
const navigate = useNavigate();
  const [user,setuser]=useState({username:'',password:''});
  const [error,setError]=useState('');
  async function handlesubmit(e: { preventDefault: () => void; })
  {
    e.preventDefault();
    console.log(user);
    if(user.password && user.username)
    {
      try {
        const response = await axios.post('http://localhost:3000/check-email', {email:user.username});
        console.log(response);
        if (response.data.exists) {
          setError('Email already exists');
        } else {
          const response=await axios.post('http://localhost:3000/adduser',{email:user.username,password:user.password});
          console.log(response);
          navigate("/login");
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    }
    else
    console.log("Invalid Credentials");
  }
  function handlechange(e: { target: { name: any; value: any; }; })
  {
    const {name,value}=e.target;
    setuser({...user,[name]:value});
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container col-11 col-md-5 col-lg-3 p-4 bg-dark text-light rounded-4 shadow">
        <div className="text-center mb-4">
          <h2>SignUp Page</h2>
        </div>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="username"
              value={user.username}
              onChange={handlechange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handlechange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary rounded-4">
              Sign Up
            </button>
          </div>
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </div>
    </div>
  )
}
export default Signup;