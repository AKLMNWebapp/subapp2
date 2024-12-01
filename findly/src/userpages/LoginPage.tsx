import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const LoginPage: React.FC = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
            if (user.Role === 'Admin') {
                navigate('/admin');
            } else if (user.Role === 'Business') {
                navigate('/business');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError('Login failed. Please check your username or password.');
        }
    };

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='password'
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Button className="btn btn-primary" type="submit">Login</Button>
            </Form>
        </Container>
    );
}

export default LoginPage;