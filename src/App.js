import './App.css';
import Login from './Components/loginFunc'


function App() {

  const USER_KEY = "user";



  const loggedUser = (user) =>{
    
    console.log(user);
    localStorage.setItem(USER_KEY,JSON.stringify(user));
    console.log(localStorage.getItem(USER_KEY));
  }

  return (
    <div className="App">
       
        <div className="App-header">
          <div className="info w-3/4 mb-20">
            <h1 className="font-mono text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500">
                Welcome to Activity journal App!
              </h1>
              <p className="font-mono">Activity journal app is a tool to help you keep track of activities and behaviours, modelled after activity journals commonly used in CBT.</p>
          </div>
          <Login loggedUser={loggedUser}/>
        </div>

    </div>
  );
}




export default App;
