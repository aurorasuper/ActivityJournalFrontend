import React from 'react'
import {useState, useEffect} from "react";
import {useParams,  Link, useNavigate} from 'react-router-dom';
import ActivityLog from './activity';


function DeleteLog() {
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);

    const USER_KEY = "user";
    const userData = JSON.parse(localStorage.getItem(USER_KEY));
    const navigate = useNavigate();

    let { id } = useParams();
    

    
    // api call to get log values
    function GetCall(){
        fetch('https://localhost:7185/api/ActivityLog/'+id,{
            method: 'GET',
            headers: {'Accept': '*/*', 'Content-Type': 'application/json', "Authorization" : `Bearer ${userData.Token}`}
        }).then(response=>response.json())
        .then(data => {
            setFormValues(data);
            setLoading(false); })
        .catch(error => console.log(error));
    }

    // api call to get log values
    function DeleteCall(){
        fetch('https://localhost:7185/api/ActivityLog/'+id,{
            method: 'Delete',
            headers: {'Accept': '*/*', 'Content-Type': 'application/json', "Authorization" : `Bearer ${userData.Token}`}
        }).then(response=>{
            if(response.ok){
                alert("Log was successfully deleted");
                navigate("/allActivities/page="+0);
            }
        })
        .catch(error => console.log(error));
    }


    // get log 
    useEffect(()=>{
        setLoading(true);
        GetCall()
    }, [])

    const Delete = () =>{

    }
  return (
    <div>
    {loading ? <div>loading...</div>:<div> 
        <h3>Do you want to delete this log?</h3>
        <ActivityLog log={formValues}/>
        <div className='flex flex-row justify-between w-1/6'>
        <Link to={"/allActivities/page="+(0)} className="text-base underline hover:text-blue-500">Cancel</Link>
        <button className="text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 p-2 rounded-lg text-lg" onClick={()=> DeleteCall()}>Confirm</button>
        </div>

    </div>}
    </div>
  )
}

export default DeleteLog