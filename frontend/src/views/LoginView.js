import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckBox from 'react-validation/build/button';
import {login} from "../my_store/actions/auth";

import {isEmail} from 'validator';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        )
    }
};

const email = value =>{
    if (!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not s valid email
            </div>
        )
    }
}

class LoginView extends Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false
        }
    }

    onChangeUsername (e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    handleLogin(e){
        e.preventDefault();
        this.setState({
            loading: true
        })
        const {username, password} = this.state;
        this.props.login(username, password);

    }

    render(){
        const {isLoggedIn, message} = this.props;
        if (isLoggedIn){return <Redirect to="/" /> }
        return (
            <div className="col md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt='profile_img'
                        className="profile-img-card"
                        />
                </div>
                <Form
                    onSubmit={this.handleLogin}

                >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                        />

                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <Input
                            type="password"
                            className='form-control'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}                        />
                    </div>
                    <div className='form-group'>
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                                <span className='spinner-border spinner-border-sm' />
                            ) }
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className='alert alert-danger' role='alert'>
                                {message}
                            </div>
                        </div>
                    )}
                </Form>


            </div>
        )
    }
}

function mapStateToProps(state) {
    const {isLoggedIn} = state.authReducer;
    const {message} = state.messageReducer;
    return{
        isLoggedIn,
        message
    }
}

export default connect(mapStateToProps, {login})(LoginView);