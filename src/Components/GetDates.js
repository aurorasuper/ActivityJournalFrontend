import React from 'react';
import ActivityLog from './activity'

function GetDates(props) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayNames= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const dayMs = 1000*60*60*24;

    // week starts on monday
    let weekStart = Math.floor(today - ((dayOfWeek-1)*1000*60*60*24));
    let hours = [];

    let weekDays = [];
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

  return (

      <div className='flex w-full'>
        {getWeekDays()}
        {getHours()}
        <div className='flex flex-col w-full border-2 border-indigo-300 mx-2'>
          <div className='w-full border border-indigo-100 block'>Time</div>
            {hours.map(h => <div key={h} className='w-full border border-indigo-100 px-0 ' ><p>{h}:00</p></div>)}
        </div>
        {
          weekDays.map(date =>  <div key={date.id} className=' w-full border-2 border-indigo-300 mx-2'><p>{date.day} {date.dateNr.getDate()}</p> 
          {hours.map(h => <div key={h} className='w-full border border-indigo-100 px-0 block' ><p>{""}</p></div>)}
          </div>)
        }
      </div>
  )
}

export default GetDates