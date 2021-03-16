import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Card, Button, Icon } from 'react-native-elements';
import { TABLES_LIST_ENDPOINT } from '../api/endpoints';
import {axiosInstance} from '../api/helpers'
import {isLoggedIn} from "../api/tokensData";
import { connect } from 'react-redux';
import {initialDataAction} from "../my_store/actions/authActions";

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        tables: [],
        doneLoading: false,
        isLoggedIn: true
    }
  }
  componentDidMount(){
      const thisComp = this;
      const doneAppLoading = this.props.doneAppLoading;
      if (doneAppLoading){
          this.setState({
              isLoggedIn: this.props.isLoggedIn
          })
      } else {
          isLoggedIn().then((response)=>{
              this.props.initialDataAction(response.accessToken, response.refreshToken, response.isLoggedIn
              )
          })
      }
      isLoggedIn().then((response)=>{
          console.log('repsonse');
          thisComp.setState({
              isLoggedIn: response
          })

      })
  }

  render(){
    const {doneLoading, tables, isLoggedIn} = this.state;
    const { navigation } = this.props;
    if (!isLoggedIn){
        console.log('here', isLoggedIn);
        navigation.navigate('Login')

    } else {
        console.log('ba', isLoggedIn)
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Hello !!! HomeScreen </Text>
          {doneLoading ? <Text>hello</Text>: <Text>Not hello </Text>}
        </View>
    )
  }

}

const mapStateToProps = state => ({
    doneAppLoading: state.authReducer.doneAppLoading,
    isLoggedIn: state.isLoggedIn
});




export default connect(mapStateToProps, {initialDataAction})(HomeScreen);