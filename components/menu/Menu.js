import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineFavoriteBorder } from "react-icons/md";
const Menu = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary mb-3">
        <Container>
          <Navbar.Brand href="#home">
            <img src="/Zepto-logo.png" />
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-capitalize">
              <div className="d-flex align-items-center">
                <div>
                  <MdOutlineFavoriteBorder />
                </div>
                <span className="ms-2">wishlist</span>
              </div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
