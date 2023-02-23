import React from 'react'
import {useState, useEffect, useRef} from "react";
import LogForm  from './LogForm';

import { Link, useNavigate } from "react-router-dom";

export default function CreateLog() {
    const formValues = {activityType: "",created:null, ended: null, difficulty: null, feeling: null};

    const [apiError, setApiError] = useState(null)
    const USER_KEY = "user";
    const userData = JSON.parse(localStorage.getItem(USER_KEY));
    const navigate = useNavigate();

    // get post log form using api
    function PostLog(values){
      console.log(JSON.stringify(values));
      fetch('https://localhost:7185/api/ActivityLog/NewLog',{
          method: 'POST',
          headers: {'Accept': '*/*', 'Content-Type': 'application/json', "Authorization" : `Bearer ${userData.Token}`},
          body: JSON.stringify(values)
      }).then(response => {
        if(response.ok){
          navigate("/allActivities/page="+0);
        }
      })
      .catch(error => (setApiError(error)));
    }
        

    const handleCallback  = (childData) =>{
      PostLog(childData);
  }





  return (
    <div>

      <h2 className='font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500  to-blue-500'>Create new Log </h2>
                  <div><LogForm setUpdateValues={handleCallback} formValues={formValues} />
              <Link to={"/allActivities/page="+(0)} className="text-base underline hover:text-blue-500">Cancel</Link>
      </div>

    </div>
  )
}
