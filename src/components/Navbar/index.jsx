import { useState, useEffect } from 'react';
import { useLocation, Link } from '@tanstack/react-router'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png';
import logoScroll from '../../assets/Logoputih.png';

function NavbarComponent({setCategory}) {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(1);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
    const handlescroll = () => {
        if (window.scrollY > 100) {
            setScroll(true);
        } else {
                setScroll(false);
            }
        }
        window.addEventListener('scroll', handlescroll);
        return () => {
            window.removeEventListener('scroll', handlescroll);
        }
    }, []);

    useEffect(() => {
        const pathToCategory = {
            '/': 'beranda',
            '/hiburan': 'hiburan',
            '/gaya hidup': 'gaya hidup',
            '/olahraga': 'olahraga',
            '/nasional': 'nasional',
            '/internasional': 'internasional',
            '/ekonomi': 'ekonomi',
            '/teknologi': 'teknologi',
        };
        setActiveLink(pathToCategory[location.pathname] || ''); // Simpan kategori
    }, [location.pathname]);
    
    const handelstyle = (category) => {
        if (scroll) {
            return {
                color: activeLink === category ? 'white' : 'white',
                fontSize: '14px',
                marginRight: '10px',
                fontWeight: activeLink === category ? 'bold' : 'normal',
            };
        } else {
            return {
                color: activeLink === category ? '#0099FF' : 'gray',
                fontSize: '14px',
                marginRight: '10px',
                fontWeight: activeLink === category ? 'bold' : 'normal',
            };
        }
    };
    

    return (
        <Navbar 
            collapseOnSelect 
            expand="lg" 
            style={{ 
                padding: '12px',
                backgroundColor: scroll ? '#0099FF' : 'white',
                position: 'fixed',
                top: '0',
                width: '100%',
                zIndex: '1000',
                transition: 'background-color 0.3s ease',
            }}>
            <Container >

                {scroll ? (
                    <>
                    <img src={logoScroll} alt="logo" 
                        className="logo" 
                    style={{ 
                        width: '25px', 
                        height: '25px', 
                        marginRight: '10px',
                    }} />
                <Navbar.Brand 
                    as={Link} to="/"
                    style={{ 
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'white',
                    }}>
                        SEAL NEWS
                        </Navbar.Brand>
                    </>
                ) : (
                    <>
                    <img src={logo} alt="logo" 
                        className="logo" 
                    style={{ 
                        width: '25px', 
                        height: '25px', 
                        marginRight: '10px',
                    }} />
                    <Navbar.Brand 
                        as={Link} to="/"
                        style={{ 
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: 'black',
                        }}>
                        SEAL NEWS
                    </Navbar.Brand>
                    </>
                )}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                    <Nav>
                        {['beranda', 'hiburan', 'gaya hidup', 'olahraga', 'nasional', 'internasional', 'ekonomi', 'teknologi'].map((category, index) => (
                        <Nav.Link
                            as={Link}
                            to={`/`}
                            key={index}
                            style={handelstyle(category)}
                            onClick={() => {
                                setCategory(category);
                            }}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Nav.Link>
                    ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    );
}

export default NavbarComponent;