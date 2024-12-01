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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const loginSuccess = await login(email, password);
            if (loginSuccess) {
                if (user?.Role === 'User') {
                    navigate("/dashboard");
                } else if (user?.Role === 'Admin') {
                    navigate("/admin");
                } else if (user?.Role === 'Business') {
                    navigate("/business");
                } else {
                    setError("Login failed. Role not recognized.");
                }
            } else {
                setError("Login failed. Please check your username or password.");
            }
        } catch (err) {
            console.error("There was a problem with login", err);
            setError("An error occurred during login. Please try again.");
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
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
};

export default LoginPage;
