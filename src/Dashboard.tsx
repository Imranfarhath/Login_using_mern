import axios from "axios";
import { useEffect,useState } from "react";
function Dashboard()
{
    const [users,setusers]=useState([]);
    const [totaluser,settotaluser]=useState(0);
    const [activeuser,setactiveuser]=useState(0);
    const [awayuser,setawayuser]=useState(0);
    const [offlineuser,setofflineuser]=useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setusers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
        const fetchuser=async()=>{
            try{
                const resp=await axios.get('http://localhost:3000/userdetail');
                setactiveuser(resp.data.online);
                setofflineuser(resp.data.offline);
                setawayuser(resp.data.away);
                settotaluser(resp.data.online+resp.data.offline+resp.data.away);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        fetchuser();
    }, []);
   return(
    <div>
    <div className="container my-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      <div className="row text-center">
        <div className="col-md-3 mb-3">
          <div className="p-3 bg-primary text-white rounded-3 shadow">
            Total User - {totaluser}
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-3 bg-success text-white rounded-3 shadow">
            Active User - {activeuser}
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-3 bg-secondary text-white rounded-3 shadow">
            Offline User - {offlineuser}
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-3 bg-warning text-dark rounded-3 shadow">
            Away User - {awayuser}
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="col-3">Email</th>
              <th className="col-3">Password</th>
              <th className="col-3">Login Time</th>
              <th className="col-3">Logout Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="col-3">{user.email}</td>
                <td className="col-3">{user.password}</td>
                <td className="col-3">{user.logintime}</td>
                <td className="col-3">{user.logouttime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    )
}
export default Dashboard;