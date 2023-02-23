import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import GetActivities from './Components/getActivities';
import CreateLog from './Components/CreateLog';
import EditLog from './Components/EditLog';
import DeleteLog from './Components/DeleteLog'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="activities" element={<GetActivities/>}/>
      <Route path="newLog" element={<CreateLog/>}/>
      <Route path="allActivities/">
        <Route path="page=:page" element={<GetActivities/>}></Route>
      </Route>
      <Route path="editLog/"> <Route path=":id" element={<EditLog/>}/></Route>
      <Route path="deleteLog/"> <Route path=":id" element={<DeleteLog/>}/></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
