import React from 'react';
import {Button} from 'react-bootstrap';

export function CategoryItem(props) {
    console.log('props', props)
    const item = props.item;
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td><Button onClick={props.handleEditButton(item.id)} primary>ΕΠΕΞΕΡΓΑΣΙΑ</Button></td>
            <td><Button danger onclick={props.deleteCategory(item.id)} />ΔΙΑΓΡΑΦΗ</td>
        </tr>
    )

}