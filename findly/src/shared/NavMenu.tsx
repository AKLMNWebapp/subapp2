import React from "react";
import { Navbar, Nav } from "react-bootstrap"
import "../components/css/style.css";

const NavMenu: React.FC = () => {
    console.log('Navmenu rendered');
    return (
        <Navbar expand="lg">
            <Navbar.Brand className="navbar-brand" href="/">
                <img src="/images/logo.jpg" alt="logo" className="logo" ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/product">Products</Nav.Link>
                    <Nav.Link href="/review">Reviews</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavMenu;