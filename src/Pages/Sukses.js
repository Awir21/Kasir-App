import React, { Component } from 'react'
import  axios  from 'axios'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../Utils/Constant'

export default class Sukses extends Component {
  componentDidMount(){
    axios.get(API_URL+"Keranjangs")
    .then(res => {
  
      const Keranjangs = res.data;
      Keranjangs.map(function(item){
        return axios
        .delete(API_URL+"Keranjangs/"+item.id)
        .then((res) => console.log(res))
        .catch((error)=> console.log(error))
      })
    })
    .catch(error => {
      console.log("Gagal", error);
    })
  }
  render() {
    return (
<div className="mt-4 text-center">
        <Image src="assets/images/TES.png" width="300" />
        <h2>Pesanan di Terima</h2>
        <p>Terimakasih Sudah Makan di sini 😊😊😊</p>
        <Link to='/'/>
        <Button variant="primary" href='/'>
          Kembali
        </Button>
      </div>
    );
  }
}
