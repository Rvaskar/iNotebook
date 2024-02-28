import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();


  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("cpassword").value;

    if(pass === cpass){

    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, email,password
      }),
    });
    const json = await response.json();

    
    
    // console.log(json);
    if (json.success) {
      //Save the Item and redirect
      
      localStorage.setItem("token", json.authToken); //saving authToken in localStorage
      navigate("/");
      
      props.showAlert("Account Created Successfully", "success");
    } else {

      props.showAlert("Invalid Credentials", "danger");
      
    }
  }else{
    props.showAlert("Please make sure you have entered the correct password and try again", "danger");

  }
  };

  const onChange = (e) => {
    //here e means event
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //targeting values with particular field where onchange event occurs
  };

  return (
    <>
    <div style={{margin:"auto"}} className="container w-75 mt-2 my-2 addContainer">
      <h1 style={{textAlign:"center", padding:"5px auto"}}> Create an account to use 𝓲𝓝𝓸𝓽𝓮𝓫𝓸𝓸𝓴</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name : 
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            name="name"
            onChange={onChange} //adding onchange event
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address : 
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange} //adding onchange event
          />
          <div id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange} //adding onchange event
            name="password"
            minLength={5}
            required
            />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange} //adding onchange event
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    <h6 style={{textAlign:"center", padding:"10px auto"}} className="my-5">Already  have an account? <Link className="mx-3" to='/login'>Login</Link></h6>
    </>
  );
};

export default Signup;
