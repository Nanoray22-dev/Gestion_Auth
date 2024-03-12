import { Navigate } from 'react-router-dom';

const Dashboard = ({ authorized }) => {
    if (!authorized) {
        return <Navigate to="/loginform" />;
    }

    // Renderizar el dashboard
};

export default Dashboard;
