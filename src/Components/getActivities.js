import React from 'react'
import {useState, useEffect, useRef} from "react";
import ActivityList from './activityList';
import GetMonth from './GetMonth';
import { Link, useNavigate } from "react-router-dom";
/**
 * Renders page that displays a users activities after login
 */
function GetActivities() {
    const [activites, setActivites] = useState([]);
    const USER_KEY = "user";
    const userData = JSON.parse(localStorage.getItem(USER_KEY));
    const navigate = useNavigate();
    
    // get list of user activities using api
    useEffect(()=>{
      
        fetch('https://localhost:7185/api/ActivityLog',{
            method: 'GET',
            headers: {'Accept': '*/*', 'Content-Type': 'application/json', "Authorization" : `Bearer ${userData.Token}`}
        }).then(response =>response.json())
        .then(data => (setActivites(data)))
        .catch(error => (console.log(error)));
    })

    const createNewLog = (e) =>{
      navigate("/newLog");
    }
    
    const LogOut = (e) =>{
      localStorage.setItem(USER_KEY, null);
      navigate("/")
    }

  return (
    <div className="App">
       
        <div className="App-inside">
          <div className="info flex flex-row ">
            <h1 className="font-mono text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 justify-self-center flex-auto">
                Activity journal
              </h1>
              <ul className='flex flex-row justify-self-end flex-none'>
                  <li className="text-blue-500 hover:text-purple-500 hover:cursor-pointer" onClick={LogOut}>Log out</li>
              </ul>
          </div>

          {/* Displays current month */}
         
          <div className='flex w-full'> 
            <Link to={"/allActivities/page="+(0)} className="text-base underline hover:text-blue-500">This week</Link>
            <div className="grow "><GetMonth /></div>
            <button className="grow-none mr-2 w-1/7 text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 p-2 rounded-lg text-lg" onClick={createNewLog}>Add log</button>
          </div>
          {/* Renders users activity list*/}
          <ActivityList activities={activites}/>
        </div>

    </div>
  )
}

export default GetActivities