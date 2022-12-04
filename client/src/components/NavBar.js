import React, { useContext } from 'react';
import { Context } from '..';
import { Navbar, Nav, Container, Button, Image, } from 'react-bootstrap';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/cart.png';


const NavBar = observer( () => {
    const { user, basket } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>miStore</Navbar.Brand>
                <Nav.Link id="responsive-navbar-nav" className="d-flex">
                    {user.user.role === 'ADMIN' && 
                        <Nav>
                            <Button 
                                variant="outline-light"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                        </Nav>
                    }
                    {user.isAuth ? 
                        <div className="d-flex">
                            <Nav>
                                <Button 
                                    style={{position: 'relative'}}
                                    className="ms-3"
                                    variant="light"
                                    onClick={() => navigate(BASKET_ROUTE)}
                                >
                                    <Image width={20} height={20} src={cart} />
                                    <div
                                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                        style={{
                                            color: 'white',
                                            width: '20px',
                                            height: '20px',
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            transform: 'translate(25%, 25%)',
                                        }}
                                    >
                                        {basket.devices.length}
                                    </div>
                                </Button>
                            </Nav>
                            <Nav>
                                
                                <Button 
                                    variant="outline-light"
                                    onClick={() => logOut()} 
                                    className="ms-3"
                                >
                                    Выйти
                                </Button>
                            </Nav>
                        </div> 
                    :
                        <Nav>
                            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    }
                </Nav.Link>
            </Container>
        </Navbar>
    );
});

export default NavBar;
