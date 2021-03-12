import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Row, Col, Form, Button} from 'react-bootstrap';
import axiosInstance from "../api/helpers";
import {CREATE_ORDER_ENDPOINT} from "../api/endpoints";



class CreateOrderView extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: '',
            cost: 0,
            table: null,
            redirect: {
                isTrue: false,
                id: null
            }

        }

    }

    componentDidMount(){
        this.setState({
            table:this.props.id
        })
    }

    handleFormSubmit = () => {
        const data = this.state;
        axiosInstance.post(CREATE_ORDER_ENDPOINT, data)
            .then(respData=>{
                console.log('responseData', respData);
                if(respData.status === 201){
                    const data = respData.data;
                    const id = data.id;
                    this.setState({
                        redirect:{
                            isTrue: true,
                            id: id
                        }
                    })
                }
            })

    };

    handleTitle = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    };

    render(){
        const {title, redirect} = this.state;
        if(redirect.isTrue){return <Redirect to={`/orders/update/${redirect.id}`} />}
        console.log('data', this.state);
        return(
            <div>
                <Row style={{marginTop:'5%'}}>
                    <Col />
                    <Col ms={6}>
                        <Form>
                            <h4>Τραπεζι {this.props.id}</h4>
                            <Form.Group controlId='formBasicTitle'>
                                <Form.Label>Τιτλος</Form.Label>
                                <Form.Control name='title' value={title} onChange={this.handleTitle} type='text' placeholder='Προαιρετικο'/>
                            </Form.Group>
                            <Button onClick={this.handleFormSubmit}>Save</Button>
                        </Form>
                    </Col>
                    <Col />
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    id: state.orderReducer.createOrderId
})

export default connect(mapStateToProps)(CreateOrderView);