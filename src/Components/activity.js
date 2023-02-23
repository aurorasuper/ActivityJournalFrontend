import React from 'react';


function ActivityLog(props){
    const {activityType, created, ended, difficulty, feeling} = props.log;

    //Get just time part from datetime
    let endedTime;
    let createdDate = new Date(created).toLocaleTimeString();
    if(ended !== null){
        endedTime = new Date(ended).toLocaleTimeString();
    }




    return(
            <div className=' log text-left text-base  key={LogId}' >
                <table>
                    <tbody>
                        <tr>
                            <td className='font-medium'>Activity: </td>
                            <td>{activityType}</td>
                        </tr>
                        <tr>
                            <td className='font-medium'>Started: </td>
                            <td>{createdDate}</td>
                        </tr>
                        <tr>
                            <td className='font-medium'>Ended: </td>
                            <td>{endedTime}</td>
                        </tr>
                        <tr>
                            <td className='font-medium'>Difficulty: </td>
                            <td>{difficulty}</td>
                        </tr>
                        <tr>
                            <td className='font-medium'>Feeling: </td>
                            <td>{feeling}</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
    )

}

export default ActivityLog;