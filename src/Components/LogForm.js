import React from 'react'
import {useState, useEffect, useRef} from "react";
import { Navigate } from 'react-router-dom';

function LogForm({setUpdateValues, formValues}) {

    const [formVals] = useState(formValues);
    const [formErrors, setFormErrors] = useState({});
    const [formUpdate, setFormUpdate, getFormUpdate] = useState(JSON.parse(JSON.stringify(formVals)));
    const [endedState, setEndedState] = useState({});
    const [started, setStarted] = useState({});
    const [isSubmit, setIsSubmit ]= useState(false);

    function assignValues(){
        // if formvalues has log id => comes from editLog. Set form values to props values
        if(formValues.logId){
            //convert date for create to format yyyy--mm-dd and set value, and time to format hh:mm
            if(formValues.created !== ""){
                let createdDateTime= new Date(formValues.created);
                document.getElementById("createdDate").value = createdDateTime.toLocaleDateString();
                document.getElementById("createdTime").value = createdDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            // same procedure for ended
            if(formValues.ended !== null){
                let endedDateTime = new Date(formValues.ended);
                console.log(endedDateTime.toLocaleDateString());
                console.log(endedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                document.getElementById("endedDate").value = endedDateTime.toLocaleDateString();
                document.getElementById("endedTime").value = endedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }

            //set difficulty
            if(formValues.feeling !== null){
                document.getElementById("difficulty-"+formValues.difficulty).checked = "checked";
            }
            //set feeling
            
            if(formValues.feeling !== null){
                document.getElementById("feeling-"+formValues.feeling).checked = "checked";
            }
        }
    }

    useEffect(()=>{
        assignValues()
        console.log(formUpdate, "after assign values");
    },[])
    
    function IsTime(timeString){
      let timeRegex =  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeRegex.test(timeString);
    }

    function IsDate(dateString){
      let dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      return dateRegex.test(dateString)
    }
    const handleChange = (e) =>{
        const {name, value} = e.target;
        let lastVal = formUpdate[name];
        if((name == "created" || name =="ended") && lastVal){ 
          

          let inputTime;
          let inputDate;
          let storedTime;
          let storedDate;
          let newVal;
          if(IsDate(value)){
            inputDate = value;
          }
          if(IsTime(value)){
            inputTime = value;
          }

          let timeStringToCheck = new Date(lastVal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          if(IsTime(timeStringToCheck)){
            storedTime = timeStringToCheck;
          }
          let dateStringToCheck = new Date(lastVal).toLocaleDateString();
          if(IsDate(dateStringToCheck)){
            storedDate = dateStringToCheck;
          }
          if(storedDate && inputTime){
            newVal = storedDate + " " + inputTime;
          }else if(storedTime && inputDate){
            newVal = inputDate + " " + storedTime;
          }else if(inputDate){
            newVal = inputDate;
          }else if(inputTime){
            newVal = inputTime
          }
            console.log(inputDate, inputTime, storedDate, storedTime);
            setFormUpdate({...formUpdate,[name]:newVal});
        }else{
          setFormUpdate({...formUpdate,[name]:value});
        }
    
        setIsSubmit(false);
    }

    useEffect(()=>{
        
      
        if(isSubmit && Object.keys(formErrors).length === 0){ 
          //pass to formvalues to parent if validation returns no errors
          console.log(formUpdate, "formToUpdate")
          setUpdateValues(formUpdate);
      }else{
        setIsSubmit(false);
      }
    });

 

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formUpdate));
        setIsSubmit(true);
    }

    const validate = (values) =>{
      const errors = {}; // object that stores error messages for different properties


      //check that the activityType property is not empty, else error is caused in APi call. 
      if(!values.activityType || values.activityType === ""){
          errors.activityType = "Activity description is required."
         
      }
      
      if(!values.created){
        errors.created = "This field is required. Set the date and time the activity started."
      }else{
        // To locale time string returns time when none exists
        console.log(values.created)
        console.log(IsDate(new Date(values.created).toLocaleDateString()), IsTime(values.created))
        if(!IsDate(new Date(values.created).toLocaleDateString()) || !IsTime( new Date(values.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))){
          errors.created = "Please insert both date and time in this field"
        }
      }



      //check that ended datetime is not before started datetime if formUpdate.ended exists
      if(formUpdate.ended !== null){
        let createdms = new Date(formUpdate.created).getTime();
        let endedms = new Date(formUpdate.ended).getTime();
        console.log(createdms, endedms)
        if(endedms<createdms){
          errors.dates = "Activity cannot end before it has started. Set an ended date and time later than started date and time."
        }
      }

      return errors;
        
    }


    return (

        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={handleSubmit}> 
            
             <div className='ui divider'></div>
                <div className='field mb-6'>
                  <label className="block w-full text-base text-left p-2">Activity</label>
                  <p className='text-sm text-left text-stone-600 mx-2'>Log what type of activity that is performed. This field is required.</p>
                  <input type="text" name="activityType"  placeholder='Example: watch tv' className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={formUpdate.activityType} onChange={handleChange}/>
                  <p className="text-red-500 text-base">{formErrors.activityType}</p>
                </div>
    
                <div className='field mb-6'>
                  <p className="text-red-500 text-base">{formErrors.dates}</p> 
                  <label className="block w-full text-base text-left p-2">Start time</label>
                  <p className='text-sm text-left text-stone-600 mx-2'>Log when the activity started. This field is required.</p>
                  <input id="createdDate" className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" type="date" name="created" onChange={handleChange}/>
                  <input id="createdTime"className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" type="time" name="created" onChange={handleChange}/>
                  <p className="text-red-500 text-base">{formErrors.created}</p>
                </div>
      
                <div className='field mb-6'>
                  <label className="block w-full text-base text-left p-2">End time</label>
                  <p className='text-sm text-left text-stone-600 mx-2'>Log when the activity ended. THis can be updated later.</p>
                  <input id="endedDate" className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" type="date" name="ended" onChange={handleChange}/>
                  <input id="endedTime" className="block w-full p-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" type="time" name="ended" onChange={handleChange}/>
                  <p className="text-red-500 text-base">{formErrors.ended}</p> 
               </div>
    
                <div className='field mb-6'>
                  <label className="block w-full text-base text-left p-2">Difficulty</label>
                  <p className='text-sm text-left text-stone-600 mx-2'>Log how difficult it felt to perform the activitu, where 1 is almost impossible and 10 is easy peasy.</p>
                  <div className='flex flex-row m-6 justify-between'>
                    <p className='text-base'>1</p>
                    <input type="radio" id="difficulty-1" name="difficulty" value="1" onChange={handleChange}/>
                    <input type="radio" id="difficulty-2" name="difficulty" value="2" onChange={handleChange}/>
                    <input type="radio" id="difficulty-3" name="difficulty" value="3" onChange={handleChange}/>
                    <input type="radio" id="difficulty-4" name="difficulty" value="4" onChange={handleChange}/>
                    <input type="radio" id="difficulty-5" name="difficulty" value="5" onChange={handleChange}/>
                    <input type="radio" id="difficulty-6" name="difficulty" value="6" onChange={handleChange}/>
                    <input type="radio" id="difficulty-7" name="difficulty" value="7" onChange={handleChange}/>
                    <input type="radio" id="difficulty-8" name="difficulty" value="8" onChange={handleChange}/>
                    <input type="radio" id="difficulty-9" name="difficulty" value="9" onChange={handleChange}/>
                    <input type="radio" id="difficulty-10" name="difficulty" value="10" onChange={handleChange}/>
                    <p className='text-sm'>10</p>
                  </div>
                </div>
                <div className='field mb-6'>
                  <label className="block w-full text-base text-left p-2">Feeling</label>
                  <p className='text-sm text-left text-stone-600 mx-2'>Log how the activity made you feel, where 1 is horrible and 10 is great.</p>
                  <div className='flex flex-row  m-6 justify-between'>
                    <p className='text-base'>1</p>
                    <input type="radio"  id="feeling-1" name="feeling" value="1" onChange={handleChange}/>
                    <input type="radio"  id="feeling-2" name="feeling" value="2" onChange={handleChange}/>
                    <input type="radio"  id="feeling-3" name="feeling" value="3" onChange={handleChange}/>
                    <input type="radio"  id="feeling-4" name="feeling" value="4" onChange={handleChange}/>
                    <input type="radio"  id="feeling-5" name="feeling" value="5" onChange={handleChange}/>
                    <input type="radio"  id="feeling-6" name="feeling" value="6" onChange={handleChange}/>
                    <input type="radio"  id="feeling-7" name="feeling" value="7" onChange={handleChange}/>
                    <input type="radio"  id="feeling-8" name="feeling" value="8" onChange={handleChange}/>
                    <input type="radio"  id="feeling-9" name="feeling" value="9" onChange={handleChange}/>
                    <input type="radio" id="feeling-10" name="feeling" value="10" onChange={handleChange}/>
                    <p className='text-sm'>10</p>
                  </div>
                </div>
                <div className="field mb-6 mt-10">
                  <button type="submit" className="block w-full text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 p-2 rounded-lg text-lg">Add</button>
                </div>
                
                
                
            </form>

    )
}

export default LogForm