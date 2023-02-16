import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { numberWithCommas } from '../Utils/Utils'

const Menus = ({menu, masukKeranjang}) => {
  return (
   
    <Col md={3} xs={6} className="mb-4">
      <Card style={{height: '15rem', width: '8rem', margin: '0 auto', cursor: 'pointer'}}
      className="shadow" onClick={() => masukKeranjang(menu)}>
      <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar}/>
      <Card.Body >
        <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
        <Card.Text>
          Rp. {numberWithCommas(menu.harga)}
        </Card.Text>
      </Card.Body>
    </Card>
      </Col>
  )
}

export default Menus
