import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
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
        const {user: currentUser} = this.props;
        if (!currentUser){
            return <Redirect to="/login/" />
        }
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

function mapStateToProps(state) {
    const {user} = state.authReducer;
    return {
        user
    }
}

export default connect(mapStateToProps)(HomepageView);