//import logo from './logo.svg';
import './App.css';

import {Home} from './components/forms/Home';
//import {BrowserRouter, Router, Switch} from 'react-router-dom'


import Container from 'react-bootstrap/Container'
import { Header } from './components/forms/Header';
import { Selection } from './components/forms/Selection';


function App() {
  return (
    
    <Container>
        <Header/>
        <Selection/>
        <Home/>
    </Container>
  );
}

export default App;
