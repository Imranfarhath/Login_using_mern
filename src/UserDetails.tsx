import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function UserDetails(){
    const navigate=useNavigate();
    const location=useLocation();
    const user=location.state||{user:{}};
    async function handleSubmit(e: { preventDefault: () => void; })
    {
        e.preventDefault();
        const email=user.user.username;
        const password=user.user.password;
        const response=await axios.post('http://localhost:3000/user-logout',{email,password});
        console.log(response);
        if(response.status==200)
        {
            navigate('/login');
        }
    }
    return(
        <div className="container mt-5">
      <div className="row justify-content-end mb-3">
        <div className="col-auto">
          <form onSubmit={handleSubmit}>
            <button className="btn btn-danger rounded-4" type="submit">Logout</button>
          </form>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center p-4 border rounded bg-light shadow">
          <h2 className="mb-4">Hello, {user.user.username}! This is your home page</h2>
        </div>
      </div>
    </div>
    )
}
export default UserDetails;