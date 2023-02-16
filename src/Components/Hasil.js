import React, { Component } from 'react'
import {Badge, Card, Col, ListGroup, Row} from 'react-bootstrap'
import { numberWithCommas } from '../Utils/Utils'
import ModalKeranjang from './ModalKeranjang'
import TotalBayar from './TotalBayar'
import { API_URL } from '../Utils/Constant'
import axios from 'axios'
import swal from 'sweetalert'

export default class Hasil extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false,
       keranjangDetail:false,
       jumlah:0,
       keterangan:'',
       totalHarga:0,
    }
  };

  handleShow = (MenuKeranjang) => {
    this.setState({
      showModal:true,
      keranjangDetail: MenuKeranjang,
      jumlah: MenuKeranjang.jumlah,
      keterangan: MenuKeranjang.keterangan,
      totalHarga: MenuKeranjang.total_harga
    })
  };

  handleClose = () => {
    this.setState({
      showModal: false
  })
};

tambah = () => {
  this.setState({
    jumlah: this.state.jumlah +1,
    totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
  })
}

kurang = () => {
  if(this.state.jumlah !== 1){
    this.setState({
      jumlah:this.state.jumlah-1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
    })
  }
}

changeHandler = (event) => {
  this.setState({
    keterangan: event.target.value
  })
}

handleSubmit =(event) => {
  event.preventDefault();
  this.handleClose();
  const data = {
    jumlah: this.state.jumlah,
    total_harga: this.state.totalHarga,
    product: this.state.keranjangDetail.product,
    keterangan: this.state.keterangan,
  };

  axios
    .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
    .then((res) => {
      this.props.getListKeranjang();
      swal({
        title: "Update Pesanan",
        text: "Berhasil Menambah" +data.product.nama,
        icon: "success",
        button: false,
        timer: 1800,
      });
    })
    .catch((error) => {
      console.log("Gagal..", error);
    });
};

hapusPesanan =(id) => {
  this.handleClose();

  axios
    .delete(API_URL + "keranjangs/" + id)
    .then((res) => {
      this.props.getListKeranjang();
      swal({
        title: "Hapus Pesanan",
        text: "Berhasil Terhapus" +this.state.keranjangDetail.product.nama,
        icon: "error",
        button: false,
        timer: 1800,
      });
    })
    .catch((error) => {
      console.log("Gagal..", error);
    });
};

  render() {
    const {Keranjangs} = this.props
    return (
      <Col md={4} className='mt-3'>
        <h4><strong>Hasil</strong></h4>
        <hr />
        {Keranjangs.length !== 0 &&(
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {Keranjangs.map((MenuKeranjang) => (
                <ListGroup.Item
                  key={MenuKeranjang.id}
                  onClick={() => this.handleShow(MenuKeranjang)}
                  style={{cursor: 'pointer'}}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {MenuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{MenuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(MenuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(MenuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar Keranjangs={Keranjangs} {...this.props} />
      </Col>
    )
  }
}

