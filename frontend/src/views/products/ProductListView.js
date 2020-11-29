import React, {Component} from 'react';
import { connect } from 'react-redux';

import {Row, Col, Table, Button, Card, Form} from 'react-bootstrap';
import axiosInstance from "../../api/helpers";
import {PRODUCT_LIST_ENDPOINT} from "../../api/endpoints";

import CreateProductView from './CreateProductView'
import {getCategories, getProductClass, getProducts} from '../../my_store/actions/productActions'
import ProductUpdateView from "./ProductUpdateView";
import ProductClassListView from './ProductClassListView';
import CategoryListView from './CategoryListView'


class ProductListView extends Component {
    constructor(props){
        super(props);
        this.state = {
            create_data: {
                price: 0,
                title: '',
                productClass: null,
                category: null
            },


            detailView: false,
            showListView: true,
            showCategoryView: false,
            showProductClassView: false,

            createView: false,
            categories: [],
            products: [],
            doneProducts:[],
            product_class: [],
            productSelectedId: null,
            product_class_view: false,
            filter_data:{
                q: ''
            }
        }
    }

    componentDidMount(){
        this.getProducts();
        this.props.getCategories();
        this.props.getProductClass();
    }

    handleDetailView(id){
        const is_open = this.state.detailView;
        if(is_open){
            this.setState({
                detailView: false
            })
        }
        this.setState({
            detailView: !this.state.detailView,
            productSelectedId: id,

        })
    };

    handleCreateView = () => {
        this.setState({
            createView: !this.state.createView
        })
    }

    handleSearch = (evt) =>{
        evt.preventDefault();
        console.log('hitted mother fucker!');
        let filter_data = {
            ...this.state.filter_data,
            [evt.target.name]: evt.target.value
        };
        console.log('filter_data', filter_data);
        this.setState({
            ...this.state,
            filter_state:{
                ...this.state.filter_data,
                filter_data: filter_data
            }
        })
    };

    getProducts(){
        axiosInstance.get(PRODUCT_LIST_ENDPOINT)
            .then(
                respData=>{
                    console.log('data', respData);
                    this.setState({
                        products: respData.data,
                        doneProducts: true
                    })
                }
            )
    }

    closeUpdateWindow = () => {console.log('window updare!'); this.setState({detailView: false})};

    closeWindow = (window) => {this.setState({[window]: false})};

    handleShowProductClassView = () => {
        this.setState({
            showListView: false,
            showProductClassView: true,
            showCategoryView: false
        }
    )};

    handleShowListView = () => {
        this.setState({
            showListView: true,
            showProductClassView: false,
            showCategoryView: false
        })
    };

    handleCreateChange = (evt) => {
        const {name, value} = evt.target;
        const create_data = {
            ...this.state.create_data,
            [name]: value
        }
        this.setState({...this.state, create_data: create_data})
    };

    handleCreateForm = () => {
        const endpoint = PRODUCT_LIST_ENDPOINT;
        const data = this.state.create_data;
        axiosInstance.post(endpoint, data)
            .then(resp=>{
                this.props.getProducts()
            })
    }
    handleShowCategoryView = () => {
        this.setState({
            showCategoryView: true,
            showListView: false,
            showProductClassView: false
        })};

    refreshProducts = () => {
        this.setState({
            createView: false,
            detailView: false
        });
        this.props.getProducts()
    };

    render(){
        const { doneProducts, productSelectedId, create_data} = this.state;
        const {showListView, detailView, showProductClassView, showCategoryView} = this.state;
        const {categories, productClass, products} = this.props;
        const {q}  = this.state.filter_data;
        return (
            <div>
                <hr />
                <Row>
                    <Col xs={12}>
                        <Button success onClick={this.handleCreateView}>ΔΗΜΙΟΥΡΓΙΑ ΠΡΟΪΌΝΤΟΣ</Button>
                        <Button primary onClick={this.handleShowProductClassView}> ΔΗΜΙΟΥΡΓΙΑ ΕΙΔΟΥΣ</Button>
                        <Button primary onClick={this.handleShowCategoryView}> ΔΗΜΙΟΥΡΓΙΑ ΚΑΤΗΓΟΡΙΑΣ</Button>
                        <Button primary onClick={this.handleShowListView}> ΛΙΣΤΑ ΠΡΟΪΟΝΤΩΝ</Button>
                    </Col>
                </Row>
                <hr />
                {showProductClassView ? <ProductClassListView closeWindow={this.closeWindow} />: null}
                {showCategoryView ? <CategoryListView /> : null}
                {showListView ?
                <Row className='justify-content-center'>
                    <Col xs={4}>
                        <Card>
                            <Card.Header><h4>ΝΕΟ ΠΡΟΪΟΝ</h4></Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>ΟΝΟΜΑΣΙΑ</Form.Label>
                                        <Form.Control onChange={this.handleCreateChange} type='text' value={create_data.title} name='title' />
                                    </Form.Group>
                                    <Form.Group name='category'  controlId="exampleForm.ControlSelect1">
                                        <Form.Label>ΚΑΤΗΓΟΡΙΑ</Form.Label>
                                        <Form.Control as="select"  onClick={this.handleCreateChange} name='category'>
                                            {categories.map(function(item, i){
                                                return <option value={item.id} name="category">{item.title}</option>
                                            })}
                                            </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>ΕΙΔΟΣ ΠΡΟΪΌΝΤΟΣ</Form.Label>
                                        <Form.Control onClick={this.handleCreateChange} as='select' name='product_class'>
                                            {productClass.map(function (item, i) {
                                                return <option value={item.id}>{item.title}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>ΤΙΜΗ</Form.Label>
                                        <Form.Control step='any' type='number' name='price' onChange={this.handleCreateChange} value={create_data.price} />
                                    </Form.Group>
                                    <Button onClick={this.handleCreateForm} primary>Save</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ΠΡΟΪΟΝ</th>
                                    <th>ΕΙΔΟΣ</th>
                                    <th>ΚΑΤΗΓΟΡΙΑ</th>
                                    <th>ΤΙΜΗ</th>
                                    <th>-</th>
                                </tr>
                                </thead>
                                <tbody>
                                {doneProducts ? products.map((product, i) => {
                                    return (
                                        <tr>
                                            <td>{product.id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.tag_product_class}</td>
                                            <td>{product.tag_category}</td>
                                            <td>{product.price}</td>
                                            <td><Button onClick={() => this.handleDetailView(product.id)}
                                                        primary>ΕΠΕΞΕΡΓΑΣΙΑ</Button></td>
                                        </tr>
                                    )
                                }) : null}


                                </tbody>
                            </Table>

                    </Col>
                    <Col xs={2}>
                       <Card style={{ width: '18rem' }}>
                           <Card.Title>Filters</Card.Title>
                           <Card.Body>
                               <Form>
                                   <Form.Group controlId='search'>
                                       <Form.Label>ΑΝΑΖΗΤΗΣΗ</Form.Label>
                                       <Form.Control onChange={this.handleSearch} type='text' placeholder='...' value={q} name='q'/>
                                   </Form.Group>
                               </Form>
                           </Card.Body>
                       </Card>
                         {detailView ? <ProductUpdateView  id={productSelectedId} closeWindow={this.closeUpdateWindow} refreshProducts={this.refreshProducts} /> : null }
                    </Col>
                </Row> : null


                }

            </div>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.productReducer.categories,
    productClass: state.productReducer.productClass,
    products: state.productReducer.products
});


export default connect(mapStateToProps, {getCategories, getProductClass, getProducts})(ProductListView)