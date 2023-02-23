import {useState, useEffect, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props){
    // validate form according to https://www.youtube.com/watch?v=EYpdEYK25Dc
    const initialValues = {email:"", password:""}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const err = useRef(false); 
    const passedUser = useRef(false); // fixes issue where useeffect loops forever 
    const navigate = useNavigate();
   
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
    const passUser = (res) =>{
      props.loggedUser(res)
      passedUser.current = true;
      let page=0;
      navigate("/allActivities/page="+page)
    }

    const passLoginError = (error) =>{
      setLoginError(error);
      console.log('loginerror', loginError)
    }

    useEffect(() =>{
      if(Object.keys(formErrors).length === 0 && isSubmit && !passedUser.current){
        console.log(JSON.stringify(formValues));
        fetch('https://localhost:7185/api/ActivityUsers/login',{
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
                passLoginError(data);
                return;
              }else {
                passUser(data);
                return;
              };
            }).catch(error => {console.log(error)});
            
      }

    })


    const validate = (values) =>{
      const errors = {};
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
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
  
      return errors; 
    }
  

    return(
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={handleSubmit}> 
         <h2 className='font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500  to-blue-500'>Login</h2>
         {loginError && <div><p className="text-red-500 text-base">{loginError}</p></div>}
         <div className='ui divider'></div>
  
            <div className='field mb-6'>
              <label className="block w-full text-base text-left p-2">Email</label>
              <input type="text" name="email" id="email" placeholder='email@example.com' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formValues.email} onChange={handleChange}/>
              <span className="text-red-500 text-base">{formErrors.email}</span>
            </div>
  
            <div className='field mb-6'>
              <label className="block w-full text-base text-left p-2">Password</label>
              <input type="password" name="password" id="password" placeholder='*************' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formValues.password} onChange={handleChange}/>
              <p className="text-red-500 text-base">{formErrors.password}</p>
            </div>
            <div className="field mb-6 mt-10">
              <button type="submit" className="block w-full text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 p-2 rounded-lg text-lg">Login</button>
            </div>
            <div className="field mb-6">
              <Link to="/register" className="text-base underline hover:text-blue-500">Not a user? Register here</Link>
            </div>
            
            
        </form>
    )
  }

  export default Login;