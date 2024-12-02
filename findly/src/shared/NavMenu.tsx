import React from "react";
import { Navbar, Nav } from "react-bootstrap"

const NavMenu: React.FC = () => {
    console.log('Navmenu rendered');
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">Findly</Navbar.Brand>
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