import { Navigate, Route ,Routes } from 'react-router-dom';
import './App.css';
import { AddUser } from './Components/AddUser';
import { EditUser } from './Components/EditUser';
import { Nopage } from './Components/NoPage';
import UserComponents from './Components/UserComponents';
import { UserDetails } from './Components/UserDetails';





function App() {

  return (
    <div className="App">
      <Routes>
         <Route exact path="/" element={ <UserComponents 
        />}>
         </Route>
         <Route exact path="/add/user" element={ <AddUser
          />}>
         </Route>
         <Route exact path="/edit/:id" element={<EditUser
          />}>
         </Route>
         <Route exact path="/user/:id" element={<UserDetails/>}>
          </Route>
          <Route exact path="/user" element={  <Navigate exact path='/'/>}>
            
          </Route>
          <Route exact path="*" element={<Nopage/>}>
              
          </Route>

      </Routes>
   
    </div>
  );
}

export default App;
