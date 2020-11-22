import React, { Component } from 'react';
import {Row, Col, Form, Button, Table, Toast} from 'react-bootstrap';
import { connect } from  'react-redux';
import axiosInstance from "../../api/helpers";
import {CATEGORIES_ENDPOINT, CATEGORY_UPDATE_DELETE_ENDPOINT} from "../../api/endpoints";
import {getCategories} from "../../my_store/actions/productActions";


class CategoryListView extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            title: '',
            active: true,
            editData:{},
            createData: {},
            showEdit: false
        }
    }

    handleChange(evt){
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    handleCheckBoxChange = (evt) => {
        const name = evt.target.name;
        const checked = evt.target.checked;
        this.setState({
            [name]: checked
        })
    };

    handleUpdateCheckBoxChange = (evt) => {
        const name = evt.target.name;
        const checked = evt.target.checked;
        const data = {
            ...this.state.editData,
            [name]: checked
        };
        this.setState({
            ...this.state,
            editData: data
        })
    };

    handleEditData = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        const editData = {
            ...this.state.editData,
            [name]: value
        };
        this.setState({
            ...this.state,
            editData:editData
        })

    };

    deleteCategory = (id) => {
        const endpoint = CATEGORY_UPDATE_DELETE_ENDPOINT + id + '/';
        axiosInstance.delete(endpoint);
        console.log('hitters!');
        this.props.getCategories()
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const data = this.state;
        axiosInstance.post(CATEGORIES_ENDPOINT, data)
            .then(respData=>{
                console.log('ffgg', respData);
                this.props.getCategories();
                this.setState({
                    title:'',
                    active: false
                })
            })
    };

    handleEditButton = (id) => {
        const endpoint = CATEGORY_UPDATE_DELETE_ENDPOINT + `${id}/`;
        axiosInstance.get(endpoint)
            .then(
                respData=> {
                    const new_data = respData.data;
                    this.setState({
                        ...this.state,
                        editData: new_data,
                        showEdit: true
                    })
                }
            )
    };

    submitEdit = (evt) => {
        evt.preventDefault();
        const data = this.state.editData;
        const endpoint = CATEGORY_UPDATE_DELETE_ENDPOINT + `${data.id}/`;
        axiosInstance.put(endpoint, data)
            .then(respData=>{
                console.log('result', respData)
                this.props.getCategories();
                this.setState({
                    showEdit: false,
                    editData: {}
                })
            })
    }

    render(){
        const { title, active, showEdit, editData } = this.state;
        const { categories} = this.props;
        return (
            <Row className="justify-content-md-center">
                <Col lg='1' />
                <Col lg='3'>
                    <Toast>
                        <Toast.Header>
                            <h4>ΔΗΜΙΟΥΡΓΙΑ ΚΑΤΗΓΟΡΙΑΣ</h4>
                        </Toast.Header>
                        <Toast.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>ΚΑΤΑΣΤΑΣΗ</Form.Label>
                                    <Form.Control onChange={this.handleCheckBoxChange} type='checkbox' name='active' checked={active}  />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>ΟΝΟΜΑΣΙΑ</Form.Label>
                                    <Form.Control onChange={this.handleChange} type='text' name='title' value={title} />
                                </Form.Group>
                                <Button variant="success" onClick={this.handleSubmit}> <i className='fas fa-save' />  ΑΠΟΘΗΚΕΥΣΗ</Button>
                            </Form>
                        </Toast.Body>
                    </Toast>
                </Col>

                <Col lg='4'>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>ΤΙΤΛΟΣ</th>
                                <th>ΚΑΤΑΣΤΑΣΗ</th>
                                <th>-</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categories.map((item, i) =>{
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.active ? <i className='fas fa-check-square' /> : <i className='fas fa-dollar' /> }</td>
                                    <td><Button onClick={() => this.handleEditButton(item.id)} primary><i className="fas fa-edit" /> </Button></td>
                                    <td><Button variant='danger'  onclick={() => this.deleteCategory(item.id)} ><i className="fas fa-trash-o" /> </Button></td>
                                </tr>
                        )
                        })}

                        </tbody>
                    </Table>
                </Col>
                {showEdit ?
                    <div>
                        <h4>ΕΠΕΞΕΡΓΑΣΙΑ {editData.title}</h4>
                        <Form.Group>
                            <Form.Label>ΚΑΤΑΣΤΑΣΗ</Form.Label>
                            <Form.Control onChange={this.handleUpdateCheckBoxChange} type='checkbox' name='active' checked={editData.active} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ΤΙΤΛΟΣ</Form.Label>
                            <Form.Control onChange={this.handleEditData} type='text' name='title' value={editData.title}  />
                        </Form.Group>

                        <Button onClick={this.submitEdit}> <i className="fas fa-edit" /> </Button>
                    </div>
                    : null
                }
                <Col>
                </Col>
            </Row>
        )
    }
}





const mapStateToProps = (state) => ({
    categories: state.productReducer.categories
});


export default connect(mapStateToProps, {getCategories})(CategoryListView);