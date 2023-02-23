import React from 'react'

export const Day = (props) => {

    const GetDay = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');

        if(props.day = dd){
            return(<p>Today</p>)
        }else{
            return(<p>{dd}</p>)
        }
    }
    return (
    <div className="Day flex flex-column">
        <div className="date">{GetDay}</div>
    </div>
    )
}
