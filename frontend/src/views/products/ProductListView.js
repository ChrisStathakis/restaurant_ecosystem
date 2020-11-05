import React, {Component} from 'react';
import {Row, Col, Table, Button, Card, Form} from 'react-bootstrap';
import axiosInstance from "../../api/helpers";
import {PRODUCT_LIST_ENDPOINT} from "../../api/endpoints";

class ProductListView extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            products: [],
            doneProducts:[],
            product_class: [],
            filter_data:{
                q: ''
            }
        }
    }

    componentDidMount(){
        this.getProducts();
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
    }
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

    render(){
        const { doneProducts, products} = this.state;
        const {q}  = this.state.filter_data;
        return (
            <div>
                <Row className='justify-content-center'>
                    <Col><h4>Gi Gi</h4></Col>
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
                               {doneProducts ? products.map((product, i)=>{
                                   return (
                                       <tr>
                                           <td>{product.id}</td>
                                           <td>{product.title}</td>
                                           <td>{product.tag_product_class}</td>
                                           <td>{product.tag_category}</td>
                                           <td>{product.price}</td>
                                           <td><Button primary>ΕΠΕΞΕΡΓΑΣΙΑ</Button></td>
                                       </tr>
                                   )
                               }) : null}


                           </tbody>
                       </Table>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </div>
        )
    }

}


export default ProductListView