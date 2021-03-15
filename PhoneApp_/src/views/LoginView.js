import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import  themes  from '../general/stylesheets';


class LoginView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
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
        this.props.loginAction(username, password);
        
    };

    render(){
        const {username, password} = this.state;
        const { navigation } = this.props;

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




export default LoginView
