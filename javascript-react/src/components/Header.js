import {Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate=useNavigate()
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const userInfo = localStorage.getItem('user-info')
        setIsLoggedIn(!!userInfo)
        setCartCount(getCartCount())
    }, [])

    let user=JSON.parse(localStorage.getItem('user-info'))

    function logOut() {
        localStorage.clear()
        navigate("/register")
    }

    function checkCart() {
        navigate("/cart")
    }

    function getCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }
    
    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
                <Navbar.Brand href="http://localhost:3000" className="title">Shoeshop</Navbar.Brand>
                <Nav className="me-auto navbar-wrapper">
                    {
                        isLoggedIn ?
                            <div>
                                <Link to="/admin">Admin panel</Link>
                                <Link to="/add">Add Products</Link>
                                <Link to="/search">Search Product</Link>
                                
                            </div>
                            :
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </div>
                    }
                </Nav>
                {isLoggedIn ? 
                    <Nav>
                        <Nav.Link onClick={checkCart} className="ms-3">
                            <i className="fas fa-shopping-cart"></i>
                            <Badge bg="secondary" pill>{cartCount}</Badge>
                        </Nav.Link>
                        <NavDropdown title={user && user.name } className="dropdown" >
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            <NavDropdown.Item onClick={checkCart}>Cart</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :
                    null
                }
            </Navbar>
        </div>
    )
}

export default Header