import {  Route, Routes } from 'react-router';
// import LoginForm from './Components/LoginForm';
import Rol from './Components/Dashboard/Rol';
import MiniDrawer from './Components/Dashboard/MiniDrawer';
import Dashboard from './Components/Dashboard/Dashboard';
import Bitacoras from './Components/Bitacoras/Bitacoras';
import UsersList from './Components/Gestion_usuarios/UsersList';

const App = () => {
    return (
        <>
        <Routes>
           
            <Route path='/' element={ <MiniDrawer/>} >
            <Route path='/usuarios' element={ <UsersList/>} />
            <Route path='/rol' element={ <Rol/>} />
            <Route path='/home' element={ <Dashboard/>} />
            <Route path='/bitacora' element={ <Bitacoras/>} />


            </Route>
        </Routes>
        
        </>
    );
};

export default App;
