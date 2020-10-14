import React, {Component} from 'react';
import axiosInstance from "../api/helpers";
import {TABLES_LIST_ENDPOINT} from "../api/endpoints";
import {Row, Col} from 'react-bootstrap';
import {TableCard} from "../components/card";


class HomepageView extends Component {
    constructor(props){
        super(props);
        this.state = {
            tables: [],
            doneLoading: false
        }
    }


    componentDidMount(){
        axiosInstance.get(TABLES_LIST_ENDPOINT).then(
            respData=>{
                this.setState({
                    doneLoading: true,
                    tables: respData.data
                })
            }
        )
    }

    render(){
        const {doneLoading, tables} = this.state;
        return (
            <div>
                <h4>Homepage</h4>
                <Row md={4}>
                    {doneLoading ?
                        tables.map((item, i) => {
                            return (
                                <TableCard title={item.title} is_free={item.is_free} />
                            );
                        })
                        :null}
                </Row>
            </div>


        )
    }

}

export default HomepageView;