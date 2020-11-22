import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col, Table, Button, Card, Form} from 'react-bootstrap';
import axiosInstance from "../../api/helpers";

import {PRODUCT_UPDATE_ENDPOINT} from '../../api/endpoints';

class ProductUpdateView extends Component{

    constructor(props){
        super(props);

        this.state = {
            product:{},
            price: 0,
            title: '',
            product_class: null,
            category: null
        }
    }

    getProduct(id){
        const endpoint = PRODUCT_UPDATE_ENDPOINT + `${id}/`;
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    const product = respData.data;
                    console.log(product)
                    this.setState({
                        product: respData.data,
                        price: product.price,
                        title: product.title,
                        product_class: product.product_class,
                        category: product.category
                    })
                }
            )
    }

    handleChange  = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    };

    handleDropdown = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const data = this.state;
        const endpoint = PRODUCT_UPDATE_ENDPOINT + `${this.props.id}/`;
        axiosInstance.put(endpoint, data)
            .then(respData=>{
                if (respData.status === 200){
                    this.props.refreshProducts()
                }

            })
    }

    closeWindow = () => {console.log('hitterd'); this.props.closeWindow()};


    componentDidMount(){
        this.getProduct(this.props.id)
    }

    render(){
        const {categories, productClass} = this.props;
        const {title, price, product_class, category } = this.state;
        console.log('category', category);
        console.log('categories', categories);
        return (
            <Form>
                <Form.Group>
                    <Form.Label>ΟΝΟΜΑΣΙΑ</Form.Label>
                    <Form.Control onChange={this.handleChange} type='text' value={title} name='title' />
                </Form.Group>
                <Form.Group name='category'  controlId="exampleForm.ControlSelect1">
                    <Form.Label>ΚΑΤΗΓΟΡΙΑ</Form.Label>
                    <Form.Control as="select"  onClick={this.handleDropdown} name='category'>
                        {categories.map(function(item, i){
                            const string_id = `"${item.id}"`;
                            console.log('here!', string_id, `"${category}"`);
                            if(string_id === `"${category}"`){
                                return <option value={item.id} name="category" >{item.title}</option>
                            }
                        })}

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
                <Button onClick={this.handleSubmit} primary>Save</Button>
                <Button onClick={this.closeWindow} warning>Close</Button>
            </Form>
        )
    }
}

const mapStateToProps  = state => ({
    categories: state.productReducer.categories,
    productClass: state.productReducer.productClass
});

export default connect(mapStateToProps, {})(ProductUpdateView);