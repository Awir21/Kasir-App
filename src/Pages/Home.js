import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import {Hasil, ListCategori, Menus} from "../Components"
import {API_URL} from '../Utils/Constant';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       categoriYangDipilih: 'Makanan',
       Keranjangs: []
    }
  }
  componentDidMount(){
    axios.get(API_URL+"products?category.nama="+this.state.categoriYangDipilih)
    .then(res => {
  
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log("Gagal", error);
    })

    this.getListKeranjang();
  }

  /*componentDidUpdate(prevState){
    if(this.state.Keranjangs !== prevState.Keranjangs){
      axios.get(API_URL+"Keranjangs")
    .then(res => {
  
      const Keranjangs = res.data;
      this.setState({ Keranjangs });
    })
    .catch(error => {
      console.log("Gagal", error);
    })
    }
  }*/

  getListKeranjang = () => {
    axios.get(API_URL+"Keranjangs")
    .then(res => {
      const Keranjangs = res.data;
      this.setState({ Keranjangs });
    })
    .catch(error => {
      console.log("Gagal", error);
    })
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: []
    })

    axios.get(API_URL+"products?category.nama="+value)
    .then(res => {
  
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log("Gagal", error);
    })
  }

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const dalamKeranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

      axios.post(API_URL+"keranjangs", dalamKeranjang)
      .then((res) => {
        this.getListKeranjang();
        swal({
              title: "Sukses ditambahkan",
              text: dalamKeranjang.product.nama,
              icon: "success",
              timer: 1500
  });
      })
      .catch(error => {
        console.log("Gagal", error);
      });

  }else {
    const dalamKeranjang = {
      jumlah: res.data[0].jumlah+1,
      total_harga: res.data[0].total_harga+value.harga,
      product: value,
    }; 

    axios.put(API_URL+"keranjangs/"+res.data[0].id, dalamKeranjang)
      .then((res) => {
        swal({
              title: "Sukses ditambahkan",
              text: dalamKeranjang.product.nama,
              icon: "success",
              timer: 1500
  });
      })
      .catch(error => {
        console.log("Gagal", error);
      });
  }

})
    .catch(error => {
      console.log("Gagal", error);
    })
    
    

  }


  render() {
    const {menus, categoriYangDipilih, Keranjangs} = this.state
    return (
      <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategori
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col className="mt-3">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil Keranjangs={Keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </Row>
          </Container>
        </div>
    )
  }
}
