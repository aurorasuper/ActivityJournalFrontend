import React from 'react';
import {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";

function Register() {
    const initialValues = {firstname:"", lastname: "", email:"", password:"", confirmPassword:""}
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [loginError, setLoginError] = useState();
    const [loginSuccess, setLoginSuccess] = useState();
    const err = useRef(false);
    const registerSuccess = useRef(false); 

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues,[name]:value});
        setIsSubmit(false);

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    const validate = (values) =>{
        const errors = {};
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/i;

        if(!values.firstname){
            errors.firstname = "Firstname is required.";
        }

        if(!values.lastname){
            errors.lastname ="Lastname is required.";
        }

        if(!values.email){
            errors.email = "Email adress is required.";
        }else if(!regex.test(values.email)){
            errors.email = "Not a valid email adress."
        }

        if(!values.password){
            errors.password = "Password is required.";
        } else if(values.password.length < 8){
            errors.password ="Password must be more than 8 characters."
        }

        if(!values.confirmPassword){
            errors.confirmPassword = "Password is required.";
        } else if(values.password.length < 8){
            errors.confirmPassword ="Password must be more than 8 characters."
        }

        if((values.confirmPassword && values.password) && values.confirmPassword !== values.password){
            errors.confirmation = "Passwords do not match.";
        }
        return errors; 
    }

    useEffect(() =>{
        if(Object.keys(formErrors).length === 0 && isSubmit && !registerSuccess.current){
          fetch('https://localhost:7185/api/ActivityUsers/Register',{
            method: 'POST',
            headers: {'Accept': '*/*', 'Content-Type': 'application/json'},
            body: JSON.stringify(formValues)})
              .then(response => {
                if(!response.ok){
                  err.current = true;
                  return response.text();
                }else{
                  err.current = false;
                  return response.json();
                }
  
              }) 
              .then(data => {
                if(err.current){
                    console.log(data)
                    setLoginError(data);
                }else {
                    registerSuccess.current = true;
                    setLoginError(null);
                    setLoginSuccess(data.message);
                    console.log(data.message);
                };
              }).catch(error => {console.log(error)});
              
        }
  
      })

  return (
    <div className="App">
       
    <div className="App-header">
      <div className="info w-3/4 mb-20">
        <h1 className="font-mono text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500">
            Activity journal
          </h1>
      </div>
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-4/3" onSubmit={handleSubmit}> 
            <h2 className='font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500  to-blue-500'>Register</h2>
            
            
            <div className='ui divider'></div>
            {loginError && <div><p className="text-red-500 text-base">{loginError}</p></div>}
            {loginSuccess && <div><p className="text-green-500 text-base">{loginSuccess}</p></div>}
            <div className='field mb-6 flex flex-wrap '>
                <div className='w-full md:w-1/2 md:mb-0 pr-3'>
                    <label className="block text-base text-left p-2">Firstname</label>
                    <input type="text" name="firstname" id="SetFirst" placeholder='Jane' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formValues.firstname} onChange={handleChange}/>
                    <p className="text-red-500 text-base">{formErrors.firstname}</p>
                </div>
                    <div className='w-full md:w-1/2'>
                    <label className="block text-base text-left p-2">Lastname</label>
                    <input type="text" name="lastname" id="SetLastname" placeholder='Doe' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formValues.lastname} onChange={handleChange}/>
                    <p className="text-red-500 text-base">{formErrors.lastname}</p>
                </div>
                
                
            </div>

            
            <div className='field mb-6'>
                <label className="block w-full text-base text-left p-2">Email</label>
                <input type="text" name="email" id="SetEmail" placeholder='email@example.com' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"value={formValues.email} onChange={handleChange}/>
                <p className="text-red-500 text-base">{formErrors.email}</p>
            </div>
            <div className='field mb-6'>
                <label className="block w-full text-base text-left p-2">Password</label>
                <input type="password" name="password" id="SetPassword" placeholder='*************' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formValues.password} onChange={handleChange}/>
                <p className="text-red-500 text-base">{formErrors.password}</p>
            </div>

            <div className='field mb-6'>
                <label className="block w-full text-base text-left p-2">Confirm password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder='*************' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formValues.confirmPassword} onChange={handleChange}/>
                <p className="text-red-500 text-base">{formErrors.confirmPassword}</p>
            </div>
            <div className="field mb-6 mt-10">
                <p className="text-red-500 text-base">{formErrors.confirmation}</p>
                <button type="submit" class="block w-full text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 p-2 rounded-lg text-lg">Register</button>
            </div>
            <Link to="/" className="text-base underline hover:text-blue-500">Back to Login</Link>
        
    </form>
    </div>

</div>

    
  )
}

export default Register