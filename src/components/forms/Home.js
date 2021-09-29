import React, {Component} from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class Home extends Component{
    render(){
        return(
            <Row>
                <Col>
                    <div className="mt-5 d-flex justify content-left">
                        Sort by doing click on: Description, Price, Model
                    </div>
                </Col>
            </Row>
            
        )
    }
}
