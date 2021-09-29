import React, {Component} from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export class Header extends Component{
    render(){
        return(
            <Row>
                <Col>
                    <h3 className="m-3 d-flex justify-content-center">American Automobiles</h3>
                </Col>
            </Row>
        )
    }
}