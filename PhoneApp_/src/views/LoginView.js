import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, Button } from 'react-native';
import  themes  from '../general/stylesheets';
import {loginAsync} from "../api/tokensData";
import {initialDataAction, loginAction} from "../my_store/actions/authActions";


class LoginView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            isLoggedIn: false
        }
    }

    handleChangeUsername = (textValue) => {
        this.setState({username: textValue})
    };

    handleChangePassword = (textValue) => {
        this.setState({password: textValue})
    };

    handleLogin = () => {
        this.setState({loading: true});
        const {username, password} = this.state;
        loginAsync(username, password).then(
            resp=>{
                if (resp){
                    this.setState({
                        isLoggedIn: true
                    })
                }
            }
        )
        
    };

    componentDidMount(){

    }



    render(){
        const {username, password, } = this.state;
        const { navigation, isLoggedIn } = this.props;
        if (isLoggedIn){
            navigation.navigate('Home');
        }
        return (
            <View>
                <Text>Login</Text>
                <TextInput
                    style={themes.inputStyle}
                    onChangeText={this.handleChangeUsername}
                    value={username}
                    placeholder='Username'
                />
                <TextInput
                    style={themes.inputStyle}
                    onChangeText={this.handleChangePassword}
                    value={password}
                    placeholder='Password'
                />
                <Button
                  title='Login'
                  onPress={this.handleLogin}
                  />
            </View>
        )
    }

}

const mapStateToProps = state =>({
    isLoggedIn: state.authReducer.isLoggedIn
})


export default connect(mapStateToProps, { initialDataAction, loginAction })(LoginView)
