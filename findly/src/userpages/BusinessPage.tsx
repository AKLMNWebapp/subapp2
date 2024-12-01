import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BusinessPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.Role !== 'Business') {
            navigate('/login'); // Redirect to login page if the user is not a business user
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Business Panel</h1>
            <p>Welcome, Business User! Here you can manage your sales, view reports, and manage products.</p>
            <div>
                <h2>Manage Products</h2>
                <button>View Products</button>
                <button>Create Product</button>
            </div>
        </div>
    );
};

export default BusinessPage;
