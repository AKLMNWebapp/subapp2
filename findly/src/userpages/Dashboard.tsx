import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Row } from 'react-bootstrap';

const Dashboard: React.FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setUserRole(user.Role);
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <Container>
            <h1>Dashboard</h1>
            {userRole === 'Admin' && (
                <Row>
                    <h2>Admin Panel</h2>
                    <p>Welcome, Admin! Here you can manage users, products, etc.</p>
                </Row>
            )}
            {userRole === 'Business' && (
                <Row>
                    <h2>Business Panel</h2>
                    <p>Welcome, Business User! Here you can view your sales and manage your products.</p>
                </Row>
            )}
            {userRole === 'RegularUser' && (
                <Row>
                    <h2>User Panel</h2>
                    <p>Welcome! Here you can view your profile and interact with available services.</p>
                </Row>
            )}
            {!userRole && <p>Loading user data...</p>}
        </Container>
    );
};

export default Dashboard;
