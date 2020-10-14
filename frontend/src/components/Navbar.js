import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Form, Button, FormControl} from 'react-bootstrap'


class MyNavbar extends Component {


    render(){
        return (
            <Navbar bg='dark' variant='dark'>
                <Navbar.Brand href=''>Home</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href=''> Orders</Nav.Link>
                    <Nav.Link href=''> Costumers</Nav.Link>
                    <Nav.Link href=''> Orders</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }
}


export default MyNavbar;