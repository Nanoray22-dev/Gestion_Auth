import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Rol from './Components/Dashboard/Rol';
import MiniDrawer from './Components/Dashboard/MiniDrawer';
import Dashboard from './Components/Dashboard/Dashboard';
import Bitacoras from './Components/Bitacoras/Bitacoras';
import UsersList from './Components/Gestion_usuarios/UsersList';
import Enlaces from './Components/Enlaces/Enlaces';
import Pages from './Components/Enlaces/Pages';
import RegisterForm from './Components/RegisterForm';
import { UserProvider } from './Components/UserContex';


const App = () => {
    return (
        <>
        <UserProvider>
        <BrowserRouter>
        <Routes>
        <Route path='/login' element={ <LoginForm/>}/>
        <Route path='/register' element={ <RegisterForm/>}/>

            <Route path='/' element={  <MiniDrawer/>} >
            <Route path='/usuarios' element={ <UsersList/>} />
            <Route path='/rol' element={ <Rol/>} />
            <Route path='/home' element={ <Dashboard />} />
            <Route path='/bitacora' element={ <Bitacoras/>} />
            <Route path='/enlace' element={ <Enlaces/>} />
            <Route path='/pages' element={ <Pages/>} />
            </Route>

            
        </Routes>
        </BrowserRouter>
        </UserProvider>
        
        </>
    );
};

export default App;
