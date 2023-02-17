import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";
import { API_URL } from "../Utils/Constant";
import { BrowserRouter, Link } from "react-router-dom";

export default class TotalBayar extends Component {
  submitTotalBayar = (TotalBayar) => {
    const pesanan = {
      total_bayar: TotalBayar,
      menus: this.props.Keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    const TotalBayar = this.props.Keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(TotalBayar)}
                </strong>
              </h4>
              <BrowserRouter forceRefresh={true}>
                <Button
                  variant="success"
                  block="true"
                  size="lg"
                  className="mt-4 mb-2 mr-2"
                  onClick={() => this.submitTotalBayar(TotalBayar)}
                  as={Link}
                  to="/Sukses"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <strong>BAYAR</strong>
                </Button>
              </BrowserRouter>
            </Col>
          </Row>
        </div>

        {/* Mobile  */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 2, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(TotalBayar)}
                </strong>
              </h4>
              <BrowserRouter forceRefresh={true}>
                <Button
                  variant="success"
                  block="true"
                  size="lg"
                  className="mt-4 mb-2 mr-2"
                  onClick={() => this.submitTotalBayar(TotalBayar)}
                  as={Link}
                  to="/Sukses"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <strong>BAYAR</strong>
                </Button>
              </BrowserRouter>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
