import {Link} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import AuthContext from '../Context/AuthContext'

function Menu(){
    return(
        <>
        <AuthContext.Consumer>{context=>
            <Navbar className="menu" bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/products"> Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {!context.userLogin &&
                            <>
                            <Nav.Link as={Link} to="/inicio">Iniciar Sesión</Nav.Link>
                            <Nav.Link as={Link} to="/registrar">Registrar</Nav.Link>
                            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                            </>
                            }
                            {context.userLogin &&
                            <>
                                {((!context.api && !context.fire) || (context.api && context.fire)) &&
                                   <Nav.Link onClick={context.logoutUser}>Cerrar Sesion</Nav.Link> 
                                }
                                {(context.fire && !context.api) &&
                                <>
                                    <NavDropdown title="Productos" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/products1">Todos</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link onClick={context.logoutUser}>Cerrar Sesion</Nav.Link>
                                </>
                                } 
                                {(context.api && !context.fire) &&
                                <>
                                    <NavDropdown title="Productos" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/products2">Todos</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/products/alta">Alta</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link onClick={context.logoutUser}>Cerrar Sesion</Nav.Link>
                                </>    
                                }
                            </>
                            }
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        }</AuthContext.Consumer>
        </>
    )
}
export default Menu