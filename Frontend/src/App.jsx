import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginForm from './Components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="loginform" element={<LoginForm />} />
        <Route path="dashboard" element={<Dashboard authorized={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
