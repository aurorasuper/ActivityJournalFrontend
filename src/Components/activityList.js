import React, { useEffect } from 'react'
import ActivityLog from './activity'
import {GoTrashcan } from 'react-icons/go';
import {FiEdit} from 'react-icons/fi';
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from 'react-icons/md'
import {useNavigate, useParams} from "react-router-dom";

const ActivityList = (props) => {
 
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayNames= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const dayMs = 1000*60*60*24;
  const navigate = useNavigate();
  let {page} = useParams();
 
  // week starts on monday
  let weekStart = Math.floor((today.getTime()+(page*7*dayMs) )- ((dayOfWeek-1)*dayMs));
  let hours = [];

  let weekDays = [];
  //console.log(new Date(today.getTime()+page*7*dayMs))
  function getWeekDays(){
    for(let i = 0; i < 7; i++){
      weekDays.push({id: i, day: dayNames[i], dateNr: new Date(weekStart+(i*dayMs))});
    }
  }

  function getHours(){
    for(let i = 0; i < 24; i++){
      hours.push(i);
    }
  }

  const goToEdit = (id) =>{
    console.log(id)
    navigate("/editLog/"+id)
  }

  const GoToDelete = (id) => {
    console.log(id);
    navigate("/deleteLog/"+id);
  }
  //delete api + pass logid


  return (

    <div className='flex w-full'>
    {getWeekDays()}
    {getHours()}
    <div><MdOutlineNavigateBefore type="button" className='text-xl m-2 hover:text-blue-500 hover:cursor-pointer' onClick={()=>navigate("/allActivities/page="+(page-1))}/></div>
    {
      weekDays.map(date =>  <div key={date.id} className=' w-full border border-indigo-300'><p className='border-2 border-indigo-400'>{date.day} {date.dateNr.getDate()}</p> 
      {props.activities.map((log) =>{
            
            if(new Date(log.created).toLocaleDateString() === date.dateNr.toLocaleDateString()){
              return (<div className='m-3 p-2 border-2 border-blue-300 hover:border-purple-500' >
                <ActivityLog  key={log.logId} id={log.logId} log={log}/>
                <div className='flex flex-row justify-end w-full'>
                  <FiEdit key={"edit"+log.logId} className='text-xl m-2 hover:text-blue-500 hover:cursor-pointer' type="button" onClick={() => goToEdit(log.logId)}/>
                  <GoTrashcan key={"deleteLog"+log.logId} className='text-xl m-2 hover:text-blue-500 hover:cursor-pointer' type="button" onClick={() =>GoToDelete(log.logId)}/>
                </div>
                
                </div>)
            }
          })  
      }
      
      
      </div>)
    }
    <div><MdOutlineNavigateNext type="button" className='text-xl m-2 hover:text-blue-500 hover:cursor-pointer' onClick={()=>navigate("/allActivities/page="+(parseInt(page)+1))}/></div>
    
  </div>
    
  )
}

export default ActivityList