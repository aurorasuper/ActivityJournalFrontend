import React from 'react'
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import LogForm from './LogForm';
import {useNavigate, Link } from "react-router-dom";

function EditLog() {
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
   
    const USER_KEY = "user";
    const userData = JSON.parse(localStorage.getItem(USER_KEY));

    const navigate = useNavigate();
    let { id } = useParams();


    // api call to get log values
    function getLog(){
        fetch('https://localhost:7185/api/ActivityLog/'+id,{
            method: 'GET',
            headers: {'Accept': '*/*', 'Content-Type': 'application/json', "Authorization" : `Bearer ${userData.Token}`}
        }).then(response=>response.json())
        .then(data => {
            setFormValues(data);
            setLoading(false); })
        .catch(error => console.log(error));
    }

    // api call to update log values
    function updateLog(values){
        console.log("sending to server" , JSON.stringify(values))
        fetch('https://localhost:7185/api/ActivityLog/'+id,{
            method: 'PUT',
            headers: {'Accept': '*/*', 'Content-Type': 'application/json', "Authorization" : `Bearer ${userData.Token}`},
            body: JSON.stringify(values)
        }).then(response=>{
            if(response.ok){
                navigate("/allActivities/page="+0)
            }else{
                return response.text()
            }}).then(data => (console.log(data)))
        .catch(error => console.log(error, "error from response"));
    }

    // get log 
    useEffect(()=>{
        setLoading(true);
        getLog()
    }, [])


    const handleCallback  = (childData) =>{
        updateLog(childData);
    }



    // update log
    return (
       
            <div>
             {loading ? <div>loading...</div>:<div>
                <h2 className='font-mono text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500  to-blue-500'>Edit log </h2>
                <div><LogForm setUpdateValues={handleCallback} formValues={formValues} />
                <Link to={"/allActivities/page="+(0)}className="text-base underline hover:text-blue-500">Cancel</Link></div>
            </div>}
            
        </div>
        

    )
}

export default EditLog