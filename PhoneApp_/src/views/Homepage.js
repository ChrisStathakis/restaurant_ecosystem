import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Card, Button, Icon } from 'react-native-elements';
import { TABLES_LIST_ENDPOINT } from '../api/endpoints';
import {axiosInstance} from '../api/helpers'
import {isLoggedIn} from "../api/tokensData";

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        tables: [],
        doneLoading: false,
        isLoggedIn: true
    }
  }


  getTables(){
      axiosInstance.get(TABLES_LIST_ENDPOINT)
          .then(respData=>{
            this.setState({
                doneLoading: true,
                tables: respData.data
            })
          })
  }

  componentDidMount(){
    this.getTables();

  }


  render(){
    const {doneLoading, tables, isLoggedIn} = this.state;
    if (!isLoggedIn){
        console.log('here');

    } else {
        console.log('ba')
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Hello !!! HomeScreen </Text>
          {doneLoading ? <Text>hello</Text>: <Text>Not hello </Text>}
        </View>
    )
  }

}





export default HomeScreen;