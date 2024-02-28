import React,{useState} from "react";
import {useNavigate,Link} from 'react-router-dom';
import "./navbar.css";

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"" , password:""})
    const navigate = useNavigate();
    

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          const json = await response.json();
          // console.log(json);
          if(json.success){
            //Save the Item and redirect

            localStorage.setItem('token', json.authToken) //saving authToken in localStorage
            navigate("/")
            props.showAlert("Logged In Successfully", "success");

          }else{
            props.showAlert("Invalid Credentials", "danger");
          }
    }

    const onChange = (e) =>{  //here e means event
        setCredentials({...credentials, [e.target.name]: e.target.value}) //targeting values with particular field where onchange event occurs

    }

  return (
    <>
    <div style={{margin:"auto"}} className="mt-3 w-75 addContainer">
      <h1 style={{textAlign:"center", padding:"5px auto"}}>Login to Continue with 𝓲𝓝𝓸𝓽𝓮𝓫𝓸𝓸𝓴</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label  htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            onChange={onChange}  //adding onchange event to take input values
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}  //adding onchange event
            value={credentials.password}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
      
    </div>
    <h6 style={{textAlign:"center", padding:"10px auto"}} className="my-5">don't  have an account? <Link className="mx-3" to='/signup'>Signup</Link></h6>
    </>
  );
};

export default Login;
