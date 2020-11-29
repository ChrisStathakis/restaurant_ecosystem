import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Table, Button, Col, Form} from 'react-bootstrap';
import axiosInstance from "../../api/helpers";
import {PRODUCT_CLASS_ENDPOINT, PRODUCT_CLASS_UPDATE_DELETE_ENDPOINT} from "../../api/endpoints";
import {getProductClass} from "../../my_store/actions/productActions";


class ProductClassListView extends Component{

    constructor(props){
        super(props);
        this.state = {
            createData: {
                title: '',
                support_warehouse: false,
                support_ingredients: false
            },
            updateData: {},
            showUpdateView: false
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const createData = {...this.state.createData, [name]: value};
        this.setState({...this.state, createData: createData});
    };

    handleUpdateChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const updateData = {...this.state.updateData, [name]: value};
        this.setState({...this.state, updateData: updateData});
    };

    handleCheckBox = (event) => {
        const name = event.target.name;
        const checked = event.taeget.checked;
        this.setState({
            [name]: checked
        })
    };

    handleUpdateCheckBox = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        const updateData  = {...this.state.updateData, [name]: value};
        this.setState({...this.state, updateData: updateData})
    };

    submitCreate = (evt) => {
        evt.preventDefault();
        const data = this.state.createData;
        axiosInstance.post(PRODUCT_CLASS_ENDPOINT, data)
            .then(respData=>{
                const response = respData.status;
                if (response === '201'){
                    const createData = {
                        'title': ''
                    }
                    this.props.getProductClass()
                }
            })
    };

    submitUpdate = (evt) => {
        evt.preventDefault();
        const endpoint = '';
        const data = this.state.updateData;
        axiosInstance.put(endpoint, data)
            .then(
                respData=>{
                    this.props.getProductClass()
                }
            )
    };

    handleUpdateButton = (id) => {
        const endpoint = PRODUCT_CLASS_UPDATE_DELETE_ENDPOINT + `${id}/`;
        axiosInstance.get(endpoint)
            .then(
                respData=> {
                    const data = respData.data;
                    const updateData = {
                        title: data.title,
                        support_warehouse: data.support_warehouse,
                        support_ingredients: data.support_ingredients,
                        id: data.id

                    }
                    this.setState({
                        updateData: respData.data,
                        showUpdateView: true
                    })
                }
            )
    }
    deleteProductClass = (id) => {
        const endpoint = PRODUCT_CLASS_UPDATE_DELETE_ENDPOINT + `${id}/`
        axiosInstance.delete(endpoint)
            .then(
                respData=>{
                    this.props.getProductClass();
                    this.setState({
                        showUpdateView: false
                    })
                }
            )
    };

    render(){
        const {product_class} = this.props;
        const { createData, updateData, showUpdateView} = this.state;
        return (
           <Row className='justify-content-center'>
                <Col>
                    <h4>ΔΗΜΙΟΥΡΓΙΑ ΕΙΔΟΥΣ</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>ΤΙΤΛΟΣ</Form.Label>
                            <Form.Control onChange={this.handleChange} type='text' name='title' value={createData.title} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ΥΠΟΣΤΗΡΙΖΕΙ ΑΠΟΘΗΚΗ</Form.Label>
                            <Form.Group onChange={this.handleCheckBox} name='support_warehouse' checked={createData.support_warehouse} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ΥΠΟΣΤΗΡΙΖΕΙ ΜΕΓΕΘΟΛΟΓΙΟ</Form.Label>
                            <Form.Control onChange={this.handleCheckBox} name='support_ingredients' checked={createData.support_ingredients} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <h4>ΕΙΔΗ ΠΡΟΪΟΝΤΩΝ</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ΟΝΟΜΑΣΙΑ</th>
                                <th>ΜΕΓΕΘΟΛΟΓΙΟ</th>
                                <th>ΣΥΝΑΛΛΑΓΕΣ</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                        {product_class.map((item, i)=>{
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.support_ingredients}</td>
                                    <td>{item.support_warehouse}</td>
                                    <Button onClick={()=> this.handleUpdateButton(item.id)}><i className='fas fa-edit' /> </Button>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    
                </Col>
                <Col>
                    {showUpdateView ?
                        <div>
                            <h4>ΕΠΕΞΕΡΓΑΣΙΑ</h4>
                            <Form>
                                <Form.Group>
                                    <Form.Label>ΤΙΤΛΟΣ</Form.Label>
                                    <Form.Control onChange={this.handleUpdateChange} type='text' name='title' value={updateData.title} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>ΥΠΟΣΤΗΡΙΖΕΙ ΑΠΟΘΗΚΗ</Form.Label>
                                    <Form.Group onChange={this.handleUpdateCheckBox} name='support_warehouse' checked={updateData.support_warehouse} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>ΥΠΟΣΤΗΡΙΖΕΙ ΜΕΓΕΘΟΛΟΓΙΟ</Form.Label>
                                    <Form.Control onChange={this.handleUpdateCheckBox} name='support_ingredients' checked={updateData.support_ingredients} />
                                </Form.Group>
                            </Form>
                            <Button viariant='success' onClick={this.submitUpdate}><i className='fas fa-edit' /> </Button>
                            <hr />
                            <Button className='pull-right' variant='danger' onClick={() => this.deleteProductClass(updateData.id)} ><i className='fas fa-trash' /> </Button>
                        </div>
                    : null}


                </Col>
            </Row>

        )
    }



}



const mapStateToProps = (state) => ({
    product_class: state.productReducer.productClass
});


export default connect(mapStateToProps, {getProductClass})(ProductClassListView)