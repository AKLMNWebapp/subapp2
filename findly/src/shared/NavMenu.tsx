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
                    <Nav.Link href="/collections">Collections</Nav.Link>
                    <Nav.Link href="/categories">Categories</Nav.Link>   
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavMenu;