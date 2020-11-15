import React, { Component } from 'react';
import axiosInstance from "../../api/helpers";

import {PRODUCT_UPDATE_ENDPOIT} from '../../api/endpoints';

class ProductUpdateView extends Component{

    constructor(props){
        super(props);

        this.state = {
            product:{},
            id: ''
        }
    }

    getProduct(id){
        const endpoint = PRODUCT_UPDATE_ENDPOIT + `${id}/`;
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    this.setState({
                        product: respData.data,
                        id: id
                    })
                }
            )
    }


    componentDidMount(){
        this.getProduct(this.props.id)
    }

    render(){

        return (
            <div>

            </div>
        )
    }
}

export default ProductUpdateView;