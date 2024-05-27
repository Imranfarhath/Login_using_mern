import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login(){
    const navigate = useNavigate();
    const [error,seterror]=useState('');
  const [user,setuser]=useState({username:'',password:''});
  async function handlesubmit(e: { preventDefault: () => void; })
  {
    e.preventDefault();
    console.log(user);
    if(user.password && user.username)
    {

      const response=await axios.post('http://localhost:3000/check-email',{email:user.username});
      console.log(response);
      if(!response.data.exists)
      {
        seterror('Email doesn\'t found.please signup your account');
      }
      else
      {
        const response=await axios.post('http://localhost:3000/check-login',{email:user.username,password:user.password});
        if(response.data.value)
        {
          if(user.username==="admin" && user.password==="admin")
            navigate('/dashboard');
          else
            navigate('/userdetails',{state:{user}});
        }
        else
        {
          seterror('Wrong Password');
        }
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
        <h2>Login Page</h2>
      </div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
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
            Login
          </button>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  </div>
  )
}
export default Login;