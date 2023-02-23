import React from 'react'

function GetMonth() {

    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const month = months[today.getMonth()];


  return (
    <div>{month}</div>
  )
}

export default GetMonth
