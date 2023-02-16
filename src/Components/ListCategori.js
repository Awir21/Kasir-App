import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../Utils/Constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensilSpoon, faCocktail, faCookie} from '@fortawesome/free-solid-svg-icons'

const Icon= ({nama}) => {
  if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensilSpoon} className="mt-2"/>
  if(nama === "Minuman") return <FontAwesomeIcon icon={faCocktail} className="mt-2"/>
  if(nama === "Cemilan") return <FontAwesomeIcon icon={faCookie} className="mt-2"/>

   return <FontAwesomeIcon icon={faUtensilSpoon} className="mt-2"/>
}

export default class ListCategori extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
          categories: []
    }
  }
  
  componentDidMount(){
    axios.get(API_URL+"categories")
    .then(res => {
  
      const categories = res.data;
      this.setState({ categories });
    })
    .catch(error => {
      console.log("Gagal", error);
    })
  }
  
  render() {
    const {categories} = this.state;
    const {changeCategory, categoriYangDipilih}= this.props;
    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
        {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={categoriYangDipilih === category.nama && "category-aktif"}
                style={{cursor: 'pointer'}}
              >
                <h5>
                <Icon nama={category.nama}/> {category.nama}
                </h5>
                </ListGroup.Item>
          ))}
      
      </ListGroup>
      </Col>
    )
  }
}
