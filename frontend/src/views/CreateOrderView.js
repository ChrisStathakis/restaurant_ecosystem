import React, {Component} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import axiosInstance from "../api/helpers";




class CreateOrderView extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: '',
            cost: 0,
            table: null

        }
    }

    componentDidMount(){
        this.setState({
            table:this.props.table_id
        })
    }

    handleFormSubmit = () => {
        const data = this.state;
        axiosInstance.post(CreateOrderView, data)
            .then(respData=>{
                if(respData.status_code === 200){
                    const new_id = respData.data.id;
                    console.log('worked!', respData.data)
                    this.props.refreshProducts();
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
    }

    render(){
        const {title} = this.state;

        return(
            <div>
                <Row>
                    <Col />
                    <Col ms={6}>
                        <Form>
                            <Form.Group controlId='formBasicTitle'>
                                <Form.Label>Τιτλος</Form.Label>
                                <Form.Control name='title' value={title} onChange={this.handleTitle} type='text' placeholder='Title'/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
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


export default CreateOrderView;