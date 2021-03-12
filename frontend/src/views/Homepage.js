import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axiosInstance from "../api/helpers";
import {TABLES_LIST_ENDPOINT} from "../api/endpoints";
import {Row, Col} from 'react-bootstrap';
import TableCard from "../components/card";


class HomepageView extends Component {
    constructor(props){
        super(props);
        this.state = {
            tables: [],
            doneLoading: false
        }
    }

    getTables(){
         axiosInstance.get(TABLES_LIST_ENDPOINT).then(
            respData=>{
                this.setState({
                    doneLoading: true,
                    tables: respData.data
                })
            }
        )
    }

    componentDidMount(){
        this.getTables();
    }

    render(){
        const {doneLoading, tables} = this.state;
        const {isLoggedIn} = this.props;

        if (!isLoggedIn){
            /*return <Redirect to="/login/" /> */
        }
        return (
            <div>
                <h4>Homepage</h4>
                <Row md={4}>
                    {doneLoading ?
                        tables.map((item, i) => {
                            return (
                                <TableCard item={item} is_free={item.is_free} />
                            );
                        })
                        :null}
                </Row>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isLoggedIn: state.authReducer.isLoggedIn
});



export default connect(mapStateToProps)(HomepageView);