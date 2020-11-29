import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Row, Col, Table, Button, Card, Form} from 'react-bootstrap';
import axiosInstance from "../../api/helpers";
import {PRODUCT_LIST_ENDPOINT} from "../../api/endpoints";

class CreateProductView extends Component{

    constructor(props){
        super(props);

        this.state = {
            price: 0,
            title: '',
            productClass: null,
            category: null
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

    handleFormSubmit = () => {
        const data = this.state;
        console.log('data', data)
        axiosInstance.post(PRODUCT_LIST_ENDPOINT, data)
            .then(
                respData =>{
                    console.log('after submit', respData.status, respData.data)
                }
            )

    };

    handleDropdown = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({
            [name]: value
        })
    }




    render(){
        const {categories, productClass} = this.props;
        const {title, price} = this.state;
        console.log('categories', categories);
        return (
            <Card>
                <Card.Header><h4>ΝΕΟ ΠΡΟΪΟΝ</h4></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ΟΝΟΜΑΣΙΑ</Form.Label>
                            <Form.Control onChange={this.handleChange} type='text' value={title} name='title' />
                        </Form.Group>
                        <Form.Group name='category'  controlId="exampleForm.ControlSelect1">
                            <Form.Label>ΚΑΤΗΓΟΡΙΑ</Form.Label>
                            <Form.Control as="select"  onClick={this.handleDropdown} name='category'>
                                {categories.map(function(item, i){
                                    return <option value={item.id} name="category">{item.title}</option>
                                })}
                                </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ΕΙΔΟΣ ΠΡΟΪΌΝΤΟΣ</Form.Label>
                            <Form.Control onClick={this.handleDropdown} as='select' name='product_class'>
                                {productClass.map(function (item, i) {
                                    return <option value={item.id}>{item.title}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ΤΙΜΗ</Form.Label>
                            <Form.Control step='any' type='number' name='price' onChange={this.handleChange} value={price} />
                        </Form.Group>
                        <Button onClick={this.handleFormSubmit} primary>Save</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
    
}


const mapStateToProps = state => ({
    categories: state.productReducer.categories,
    productClass: state.productReducer.productClass
})

export default connect(mapStateToProps, {})(CreateProductView);