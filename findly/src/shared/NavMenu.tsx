import { AuthContext } from "../context/AuthContext";
import React, {useContext} from "react";
import { Navbar, Nav } from "react-bootstrap"

const NavMenu: React.FC = () => {

    const {user, logout} = useContext(AuthContext);
    const handleLogout = async () => {
        await logout();
    };
    console.log('Navmenu rendered');
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">Findly</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/product">Products</Nav.Link>
                    <>
                    {user.Role === "User" && <Nav.Link href="/admin">User Dashboard</Nav.Link>}
                    {user.Role === "Admin" && <Nav.Link href="/admin">Admin dashboard</Nav.Link>}
                    {user.Role === "Business" && <Nav.Link href="/business">Business dashboard</Nav.Link>}
                    <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
                    </>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavMenu;