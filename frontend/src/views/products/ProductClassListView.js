import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Table, Button, Col, Form} from 'react-bootstrap';
import axiosInstance from "../../api/helpers";
import {PRODUCT_CLASS_ENDPOINT} from "../../api/endpoints";




class ProductClassListView extends Component{

    constructor(props){
        super(props);
        this.state = {
            product_class_list: []
        }
    }

    render(){
        const {product_class} = this.props;

        return (
           <Row className='justify-content-center'>
                <Col>
                    <h4>ΔΗΜΙΟΥΡΓΙΑ ΕΙΔΟΥΣ</h4>

                </Col>
                <Col>
                    <h4>ΕΙΔΗ ΠΡΟΪΟΝΤΩΝ</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>fd</Form.Label>
                            <Form.Control type='text' name='title' />
                        </Form.Group>
                    </Form>
                    
                </Col>
                <Col>

                    <h4>CREATE</h4>

                </Col>
            </Row>

        )
    }



}



const mapStateToProps = (state) => ({
    product_class: state.productReducer.productClass
});


export default connect(mapStateToProps, {})(ProductClassListView)