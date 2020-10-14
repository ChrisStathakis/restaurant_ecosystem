import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class TableCard extends React.Component{


    render(){
        const {title, is_free, id} = this.props;
        return (
           <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                  {is_free ?
                      <Link to="/create-order/">
                        <Button variant="success">Ελευθερο</Button>
                      </Link>
                      :<Button variant="danger">Κοσμος</Button> }
              </Card.Body>
            </Card>
        )
    }
}