import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Button, Card } from 'react-bootstrap';

const AdminPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.Role !== 'Admin') {
            navigate('/login'); // Redirect to login page if the user is not an admin
        }
    }, [user, navigate]);

    return (
        <Container>
            <h1>Admin Panel</h1>
            <p>Welcome, Admin! Here you can manage users, products, and other admin-specific content.</p>
            <Card>
                <Card.Title>Manage</Card.Title>
                <Button>View Users</Button>
                <Button>Create User</Button>
            </Card>
        </Container>
    );
};

export default AdminPage;
