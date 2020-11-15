import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Row, Col, Table, Button, Card, Form} from 'react-bootstrap';

class CreateProductView extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    handleChange = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    };




    render(){
        const {categories, productClass} = this.props;
        console.log('categories', categories)
        return (
            <Form>
                <Form.Group>
                    <Form.Label>ΟΝΟΜΑΣΙΑ</Form.Label>
                    <Form.Control onChange={this.handleChange} type='text' value='' name='title' />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>ΚΑΤΗΓΟΡΙΑ</Form.Label>
                    <Form.Control as="select">
                        {categories.map(function(item, i){
                            return <option>{item.title}</option>
                        })}
                        </Form.Control>
                </Form.Group>

            </Form>
        )
    }
    
}


const mapStateToProps = state => ({
    categories: state.productReducer.categories,
    productClass: state.productReducer.productClass
})

export default connect(mapStateToProps, {})(CreateProductView);