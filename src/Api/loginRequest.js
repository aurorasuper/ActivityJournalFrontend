import React from "react";

const fetchUsers = (formValues) => {
// Where we're fetching data from
    React.state = {
      result:{}
    }
    let err = false;
    fetch('https://localhost:7185/api/ActivityUsers/login',{
    method: 'POST',
    headers: {'Accept': '*/*', 'Content-Type': 'application/json'},
    body: JSON.stringify(formValues)})
      .then(response => {
        if(!response.ok){
          
          err = true;
         return response.text();
        }
        return response.json();
      }) 
      .then(result => {
        this.state.result = result;
        })

      console.log('api response', this.state.result);
      return this.state; 
      
    
}

export default fetchUsers;