import React, {Component} from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Selects from "../general_components/selects/select";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component';

export class Selection extends Component{
    constructor(props){
        super(props);
        this.state = {
            options_enterprise_sel: null,
            options_enterprise: [],
            list_cars_by_enterprise: [],
            data: [],
            columns: [
                {
                    name: 'Id',
                    selector: row => row.id
                },
                {
                    name: 'Description',
                    selector: row => row.modelDescription,
                    sortable: true

                },
                {
                    name: 'Price',
                    selector: row => row.price,
                    sortable: true
                },
                {
                    name: 'Model',
                    selector: row => row.model,
                    sortable: true
                },
                {
                    name: 'Mileage',
                    selector: row => row.milleage +' KM'
                },
                {
                    name: 'Color',
                    selector: row => row.color
                },
                {
                    name: 'Status',
                    selector: row => row.display
                },
            ]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return(
            <div>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md="1" ><label className="label-orientation">Dealer:</label></Col>
                                    <Col md="3">
                                        <Selects name="enterprise" value={this.state.options_enterprise_sel}  onChange={(value) => { this.setState({ options_enterprise_sel: value }, ()=>{this.GetCarsByEnterprise()}) }} options={this.state.options_enterprise} />
                                    </Col>
                                    <Col md={{ offset: 5 , number:1}} ><label className="label-orientation">Sort by:</label></Col>
                                    <Col md="2"><Button onClick={this.handleClick}>Model & Price</Button></Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <DataTable columns={this.state.columns} data={this.state.data}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            
        )
    }
    //#region Methods

    GetEnterprises(){
        return new Promise((resolve, reject) =>{
            fetch(process.env.REACT_APP_API+'Enterprise/All')
            .then((response) => {
                resolve(response.json())
            })
            .catch(err => {
                console.log(err);
                reject('Error al cargar datos de catálogos desde API: ' + err);
            });
        })
    }

    ProcessEnterpriseToSelect(array){
        let cbxEnterprise = [];

        if(array !== null){
            array.forEach(item => {
                cbxEnterprise.push({value: item.id, label: item.description})
            });
        }

        return cbxEnterprise;
    }

    GetCarsByEnterprise(){
        let idEnterprise = this.state.options_enterprise_sel!==null ? this.state.options_enterprise_sel.value : null ;

        if(idEnterprise !== null){
            fetch(process.env.REACT_APP_API+`Dealer/Cars/Location/${idEnterprise}`)
            .then(response=>response.json())
            .then((data) => {
                this.setState({data: data.response});
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    handleClick(){
        var array = this.state.data;
        if(array.length > 0){
            array.sort(function(a, b) {
                return a["Model"] - b["Model"] || a["Price"] - b["Price"];
            });
            console.log("ORDER BY: ", array)
            this.setState({data: null}, ()=>{
                this.setState({data: array})
            });
        }else{
            alert("Select a dealer first!");
        }
    }




    //#endregion


    //#region Life Cicle

    componentDidMount(){
        Promise.all([
            this.GetEnterprises()
        ])
        .then(([result_enterprise]) => {
            this.setState({options_enterprise: this.ProcessEnterpriseToSelect(result_enterprise.response)})
        })
    }

    //#endregion
}