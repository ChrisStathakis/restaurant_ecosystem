import React from 'react';
import { connect } from 'react-redux';

import {Card, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import { selectCreateTable} from "../my_store/actions/orderActions";

class TableCard extends React.Component{

   constructor(props){
       super(props);
       this.handleClick = this.handleClick.bind(this);
       this.state = {
           id: this.props.id,
           redirect: false
       }
   }

   handleClick(){
       const id = this.props.item.id;
       console.log('click!', id, this.props.item);
       this.props.selectCreateTable(id);
       this.setState({
           redirect: true
       })
   }


    render(){
        const {title, is_free } = this.props.item;
        const { redirect } = this.state;
        if (redirect){return <Redirect to='/create-order/'/>}
        return (
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        {is_free ?
                            <Button onClick={this.handleClick} variant="success">Ελευθερο</Button>

                            : <Button variant="danger">Κοσμος</Button>}
                    </Card.Body>
                </Card>
            )

    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { selectCreateTable})(TableCard);