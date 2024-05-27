import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

//const datas=[{name:"IMRAN FARHATH.A",city:"Thiruvarur",description:"Full stack Web developer",status:true,skills:["HTML","CSS","Javascript","React","Node"]},{name:"BALA MURUGAN.M",city:"Nagapattinam",description:"Lead Digital Marketer",status:false,skills:["Figma","Mural","Adobe","Powerpoint","MS word","MS Excel"]},{name:"SHAHIN.T",city:"Nagapattinam",description:"Quality Engineer",status:false,skills:["Serenium","Java","HTML","C++","C","Python"]}]
function App() {
  const navigate=useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="mb-5 text-primary">Welcome to our page</h1>
      <div className="row w-100 justify-content-center">
        <div className="col-6 col-md-3 text-center mb-3">
          <button
            type="button"
            className="btn btn-primary btn-lg w-100"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
        <div className="col-6 col-md-3 text-center mb-3">
          <button
            type="button"
            className="btn btn-secondary btn-lg w-100"
            onClick={handleSignupClick}
          >
            Signup
          </button>
        </div>
      </div>
    </div>


    
  )
}

export default App
